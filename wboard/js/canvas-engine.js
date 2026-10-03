// Next-Gen Interactive Whiteboard Canvas Engine (Smooth Vector, High-DPI, Pressure & Velocity Smoothing)
class CanvasEngine {
    constructor(canvasElement, overlayCanvasElement) {
        this.canvas = canvasElement;
        this.ctx = this.canvas.getContext('2d', { alpha: false });
        
        this.overlayCanvas = overlayCanvasElement;
        this.overlayCtx = this.overlayCanvas ? this.overlayCanvas.getContext('2d') : null;

        // Viewport / Camera Transform
        this.scale = 1.0;
        this.panX = 0;
        this.panY = 0;
        this.minScale = 0.1;
        this.maxScale = 5.0;

        // Theme & Grid Settings
        this.theme = 'light';
        this.gridSize = 25;
        this.showGrid = true;

        // Multi-Page / Slide Architecture
        this.slides = [
            { id: 1, title: 'Slide 1', objects: [], undoStack: [], redoStack: [] }
        ];
        this.currentSlideIndex = 0;

        // Active Tool & Style State
        this.activeTool = 'pen'; // 'select', 'pen', 'pencil', 'brush', 'highlighter', 'laser', 'eraser', 'line', 'arrow', 'curve', 'curve-arrow', 'rect', 'ellipse', 'triangle', 'diamond', 'star', 'text', 'sticky', 'lens', 'hand'
        this.strokeColor = '#4f46e5';
        this.fontColor = '#1e293b';
        this.fillColor = 'transparent';
        this.customBgColor = null;
        this.colorTarget = 'text'; // 'text' (stroke & font color) or 'bg' (shape fill & board background)
        this.strokeWidth = 4;
        this.strokeDash = 'solid';
        this.fontSize = 20;
        this.fontFamily = 'Inter, sans-serif';
        this.smartShapeDetection = false; // Disabled by default for 100% fluid freehand motion
        this._lensDebounceTimers = new Map();

        // Language Translation State
        this.isTranslationActive = false;
        this.currentLanguage = 'hinglish';

        // Multi-Selection, Marquee Box & Transformation State
        this.isDrawing = false;
        this.isPanning = false;
        this.panStart = { x: 0, y: 0 };
        this.currentStroke = null;
        this.selectedObjects = [];
        this.selectedObject = null;
        this.selectionBox = null;
        this.isSelectingArea = false;
        this.isDraggingSelection = false;
        this.isDraggingObject = false;
        this.dragOffset = { x: 0, y: 0 };
        this.lastDragWorld = { x: 0, y: 0 };
        this.isResizingObject = false;
        this.resizeHandle = null;
        this.initialBounds = null;
        this.initialObject = null;
        this.initialCompoundBounds = null;
        this.initialObjectsState = null;
        this.copiedObjects = [];
        this.lastPoint = null;

        // Presentation & Laser Effects
        this.laserTrail = [];
        this.spotlightMode = false;
        this.spotlightRadius = 140;
        this.mousePos = { x: 0, y: 0 };
        this.screenMousePos = { x: 0, y: 0 };

        // Active inline editor tracking
        this.activeInlineEditor = null;

        this.init();
    }

    get currentSlide() {
        return this.slides[this.currentSlideIndex];
    }

    get objects() {
        return this.currentSlide.objects;
    }

    init() {
        this.resizeCanvas();
        window.addEventListener('resize', () => this.resizeCanvas());
        this.setupEventListeners();
        this.startAnimationLoop();
    }

    requestRender() {
        if (this._renderPending) return;
        this._renderPending = true;
        requestAnimationFrame(() => {
            this._renderPending = false;
            this.render();
        });
    }

    resizeCanvas() {
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        const parent = this.canvas.parentElement;
        const rect = parent ? parent.getBoundingClientRect() : null;
        
        const w = rect ? rect.width : window.innerWidth;
        const h = rect ? rect.height : (window.innerHeight - 56);
        
        this.canvas.width = Math.floor(w * dpr);
        this.canvas.height = Math.floor(h * dpr);
        this.canvas.style.width = '100%';
        this.canvas.style.height = '100%';
        
        this.ctx.setTransform(1, 0, 0, 1, 0, 0);
        this.ctx.scale(dpr, dpr);
        this.ctx.imageSmoothingEnabled = true;
        this.ctx.imageSmoothingQuality = 'high';

        if (this.overlayCanvas) {
            this.overlayCanvas.width = Math.floor(w * dpr);
            this.overlayCanvas.height = Math.floor(h * dpr);
            this.overlayCanvas.style.width = '100%';
            this.overlayCanvas.style.height = '100%';
            this.overlayCtx.setTransform(1, 0, 0, 1, 0, 0);
            this.overlayCtx.scale(dpr, dpr);
            this.overlayCtx.imageSmoothingEnabled = true;
        }

        this.render();
    }

    screenToWorld(screenX, screenY) {
        return {
            x: (screenX - this.panX) / this.scale,
            y: (screenY - this.panY) / this.scale
        };
    }

    worldToScreen(worldX, worldY) {
        return {
            x: worldX * this.scale + this.panX,
            y: worldY * this.scale + this.panY
        };
    }

    getViewCenter() {
        const rect = this.canvas.parentElement.getBoundingClientRect();
        return this.screenToWorld(rect.width / 2, rect.height / 2);
    }

    getObjectBounds(obj) {
        if (!obj) return null;
        let minX = obj.x, minY = obj.y, maxX = (obj.x || 0) + (obj.width || 0), maxY = (obj.y || 0) + (obj.height || 0);

        if (obj.points && obj.points.length > 0) {
            minX = Infinity; minY = Infinity; maxX = -Infinity; maxY = -Infinity;
            obj.points.forEach(p => {
                minX = Math.min(minX, p.x); maxX = Math.max(maxX, p.x);
                minY = Math.min(minY, p.y); maxY = Math.max(maxY, p.y);
            });
        } else if (obj.x1 !== undefined && obj.x2 !== undefined) {
            minX = Math.min(obj.x1, obj.x2); maxX = Math.max(obj.x1, obj.x2);
            minY = Math.min(obj.y1, obj.y2); maxY = Math.max(obj.y1, obj.y2);
            if (obj.x3 !== undefined) {
                minX = Math.min(minX, obj.x3); maxX = Math.max(maxX, obj.x3);
                minY = Math.min(minY, obj.y3); maxY = Math.max(maxY, obj.y3);
            }
            if (obj.cx !== undefined) {
                minX = Math.min(minX, obj.cx); maxX = Math.max(maxX, obj.cx);
                minY = Math.min(minY, obj.cy); maxY = Math.max(maxY, obj.cy);
            }
        } else if (obj.type === 'ellipse') {
            const rx = obj.radiusX || Math.abs(obj.width) / 2 || 60;
            const ry = obj.radiusY || Math.abs(obj.height) / 2 || 60;
            const cx = obj.radiusX ? obj.x : obj.x + (obj.width || 0) / 2;
            const cy = obj.radiusY ? obj.y : obj.y + (obj.height || 0) / 2;
            minX = cx - rx; maxX = cx + rx;
            minY = cy - ry; maxY = cy + ry;
        } else if (obj.type === 'text') {
            const lines = (obj.text || '').split('\n');
            const lineCount = lines.length;
            const maxLineLen = Math.max(...lines.map(l => l.length), 10);
            const textW = Math.max(120, maxLineLen * ((obj.fontSize || 20) * 0.65));
            const textH = lineCount * ((obj.fontSize || 20) * 1.5);
            minX = obj.x; maxX = obj.x + textW;
            minY = obj.y - (obj.fontSize || 20); maxY = obj.y + textH;
        } else {
            const w = obj.width || 100;
            const h = obj.height || 100;
            minX = Math.min(obj.x, obj.x + w);
            maxX = Math.max(obj.x, obj.x + w);
            minY = Math.min(obj.y, obj.y + h);
            maxY = Math.max(obj.y, obj.y + h);
        }

        const width = Math.max(10, maxX - minX);
        const height = Math.max(10, maxY - minY);
        return { minX, minY, maxX, maxY, width, height };
    }

    getCompoundBounds(objects) {
        if (!objects || objects.length === 0) return null;
        let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
        objects.forEach(obj => {
            const b = this.getObjectBounds(obj);
            if (b) {
                minX = Math.min(minX, b.minX);
                maxX = Math.max(maxX, b.maxX);
                minY = Math.min(minY, b.minY);
                maxY = Math.max(maxY, b.maxY);
            }
        });
        if (minX === Infinity) return null;
        return {
            minX,
            minY,
            maxX,
            maxY,
            width: Math.max(10, maxX - minX),
            height: Math.max(10, maxY - minY)
        };
    }

    getSelectionHandles() {
        if (!this.selectedObjects || this.selectedObjects.length === 0) return [];
        
        if (this.selectedObjects.length === 1) {
            const obj = this.selectedObjects[0];
            const bounds = this.getObjectBounds(obj);
            if (!bounds) return [];
            const padding = 8;
            const x1 = bounds.minX - padding;
            const y1 = bounds.minY - padding;
            const x2 = bounds.maxX + padding;
            const y2 = bounds.maxY + padding;
            const mx = (x1 + x2) / 2;
            const my = (y1 + y2) / 2;
            const cx = obj.x + (obj.width || bounds.width) / 2;
            const cy = obj.y + (obj.height || bounds.height) / 2;
            const rot = obj.rotation || 0;

            const cos = Math.cos(rot);
            const sin = Math.sin(rot);
            const rotPt = (px, py) => {
                if (!rot) return { x: px, y: py };
                return {
                    x: cx + (px - cx) * cos - (py - cy) * sin,
                    y: cy + (px - cx) * sin + (py - cy) * cos
                };
            };

            const nw = rotPt(x1, y1);
            const ne = rotPt(x2, y1);
            const sw = rotPt(x1, y2);
            const se = rotPt(x2, y2);
            const n = rotPt(mx, y1);
            const s = rotPt(mx, y2);
            const w = rotPt(x1, my);
            const e = rotPt(x2, my);
            const rotHandle = rotPt(mx, y1 - 24 / this.scale);

            return [
                { type: 'rotate', x: rotHandle.x, y: rotHandle.y, cursor: 'grab' },
                { type: 'nw', x: nw.x, y: nw.y, cursor: 'nwse-resize' },
                { type: 'ne', x: ne.x, y: ne.y, cursor: 'nesw-resize' },
                { type: 'sw', x: sw.x, y: sw.y, cursor: 'nesw-resize' },
                { type: 'se', x: se.x, y: se.y, cursor: 'nwse-resize' },
                { type: 'n', x: n.x, y: n.y, cursor: 'ns-resize' },
                { type: 's', x: s.x, y: s.y, cursor: 'ns-resize' },
                { type: 'w', x: w.x, y: w.y, cursor: 'ew-resize' },
                { type: 'e', x: e.x, y: e.y, cursor: 'ew-resize' }
            ];
        }

        const compound = this.getCompoundBounds(this.selectedObjects);
        if (!compound) return [];

        const padding = 10;
        const x1 = compound.minX - padding;
        const y1 = compound.minY - padding;
        const x2 = compound.maxX + padding;
        const y2 = compound.maxY + padding;
        const mx = (x1 + x2) / 2;
        const my = (y1 + y2) / 2;

        return [
            { type: 'rotate', x: mx, y: y1 - 24 / this.scale, cursor: 'grab' },
            { type: 'nw', x: x1, y: y1, cursor: 'nwse-resize' },
            { type: 'ne', x: x2, y: y1, cursor: 'nesw-resize' },
            { type: 'sw', x: x1, y: y2, cursor: 'nesw-resize' },
            { type: 'se', x: x2, y: y2, cursor: 'nwse-resize' },
            { type: 'n', x: mx, y: y1, cursor: 'ns-resize' },
            { type: 's', x: mx, y: y2, cursor: 'ns-resize' },
            { type: 'w', x: x1, y: my, cursor: 'ew-resize' },
            { type: 'e', x: x2, y: my, cursor: 'ew-resize' }
        ];
    }

    isPointInSelection(x, y) {
        if (!this.selectedObjects || this.selectedObjects.length === 0) return false;
        if (this.selectedObjects.some(obj => this.isPointInObject(x, y, obj))) return true;
        const compound = this.getCompoundBounds(this.selectedObjects);
        if (compound) {
            const pad = 10;
            return x >= compound.minX - pad && x <= compound.maxX + pad &&
                   y >= compound.minY - pad && y <= compound.maxY + pad;
        }
        return false;
    }

    setupEventListeners() {
        // Pointer Events strictly attached to Canvas so UI clicks NEVER trigger drawing strokes
        this.canvas.addEventListener('pointerdown', (e) => this.onPointerDown(e), { passive: false });
        window.addEventListener('pointermove', (e) => this.onPointerMove(e), { passive: false });
        window.addEventListener('pointerup', (e) => this.onPointerUp(e), { passive: false });
        window.addEventListener('pointercancel', (e) => this.onPointerUp(e), { passive: false });

        // Touch event scroll prevention during active canvas operations to eliminate browser stutter
        this.canvas.addEventListener('touchmove', (e) => {
            if (this.isDrawing || this.isPanning || this.isDraggingSelection || this.isSelectingArea || this.isResizingObject) {
                if (e.cancelable) e.preventDefault();
            }
        }, { passive: false });

        // Touch double-tap detection for mobile/touch screens
        let lastTouchTime = 0;
        let lastTouchPos = { x: 0, y: 0 };
        this.canvas.addEventListener('touchend', (e) => {
            const now = Date.now();
            if (e.changedTouches && e.changedTouches.length === 1) {
                const touch = e.changedTouches[0];
                const dist = Math.hypot(touch.clientX - lastTouchPos.x, touch.clientY - lastTouchPos.y);
                if (now - lastTouchTime < 350 && dist < 30) {
                    const rect = this.canvas.getBoundingClientRect();
                    const sx = touch.clientX - rect.left;
                    const sy = touch.clientY - rect.top;
                    const world = this.screenToWorld(sx, sy);
                    const hitObj = this.findObjectAt(world.x, world.y);
                    if (hitObj && this.isEditableObject(hitObj)) {
                        this.editObjectInline(hitObj, world.x, world.y);
                    } else if (this.activeTool === 'select' || this.activeTool === 'text') {
                        this.createInlineTextEditor(sx, sy, world.x, world.y);
                    }
                }
                lastTouchTime = now;
                lastTouchPos = { x: touch.clientX, y: touch.clientY };
            }
        }, { passive: true });

        // Canvas Wheel for Zoom & Pan
        this.canvas.addEventListener('wheel', (e) => this.onWheel(e), { passive: false });

        // Double Click on canvas for editing text or stickies
        this.canvas.addEventListener('dblclick', (e) => this.onDoubleClick(e));

        // Window shortcuts, Clipboard Paste & Drag-and-Drop Image / GIF import
        window.addEventListener('keydown', (e) => this.onKeyDown(e));
        window.addEventListener('paste', (e) => this.onPaste(e));
        this.setupDragAndDrop();
    }

    onPointerDown(e) {
        // Close any open inline text editor
        if (this.activeInlineEditor) {
            this.commitInlineEditor();
        }

        // Panning: Middle mouse, Space + Click, or Hand tool
        if (e.button === 1 || e.spaceKey || this.activeTool === 'hand') {
            this.isPanning = true;
            this.panStart = { x: e.clientX - this.panX, y: e.clientY - this.panY };
            this.canvas.setPointerCapture(e.pointerId);
            return;
        }

        if (e.button !== 0) return; // Only primary button

        this.canvas.setPointerCapture(e.pointerId);

        const rect = this.canvas.getBoundingClientRect();
        const screenX = e.clientX - rect.left;
        const screenY = e.clientY - rect.top;
        const world = this.screenToWorld(screenX, screenY);
        this.mousePos = world;
        this.screenMousePos = { x: screenX, y: screenY };

        if (this.activeTool === 'select') {
            const hasModifier = (e.ctrlKey || e.shiftKey || e.metaKey);

            // A. Modifier (Ctrl / Shift / Cmd) Key: Toggle / Deselect / Add individual items
            if (hasModifier) {
                const hitObj = this.findObjectAt(world.x, world.y);
                if (hitObj) {
                    const idx = this.selectedObjects.indexOf(hitObj);
                    if (idx >= 0) {
                        // DESELECT the clicked item from the selection
                        this.selectedObjects.splice(idx, 1);
                        this.selectedObject = this.selectedObjects.length > 0 ? this.selectedObjects[0] : null;
                        window.soundManager.playPop();
                    } else {
                        // SELECT / ADD the clicked item to the selection
                        this.selectedObjects.push(hitObj);
                        this.selectedObject = hitObj;
                        window.soundManager.playClick();
                    }
                    this.triggerPropertySync(this.selectedObject);
                    this.autoSave();
                    this.render();
                    return;
                }

                // If modifier + clicked on empty canvas -> start marquee selection preserving existing items
                this.isSelectingArea = true;
                this.selectionBox = {
                    startX: world.x,
                    startY: world.y,
                    currentX: world.x,
                    currentY: world.y,
                    preserveExisting: true,
                    initialSelection: [...this.selectedObjects]
                };
                this.render();
                return;
            }

            // 1. Check if clicked on any resize or rotate handle of selection
            if (this.selectedObjects && this.selectedObjects.length > 0) {
                const handles = this.getSelectionHandles();
                const hitRadius = 14 / this.scale;
                for (let h of handles) {
                    if (Math.hypot(world.x - h.x, world.y - h.y) <= hitRadius) {
                        this.saveUndoState();
                        if (h.type === 'rotate') {
                            this.isRotatingObject = true;
                            const bounds = this.selectedObjects.length === 1 
                                ? this.getObjectBounds(this.selectedObjects[0]) 
                                : this.getCompoundBounds(this.selectedObjects);
                            this.rotateCenter = {
                                x: this.selectedObjects.length === 1 ? (this.selectedObjects[0].x + (this.selectedObjects[0].width || bounds.width) / 2) : ((bounds.minX + bounds.maxX) / 2),
                                y: this.selectedObjects.length === 1 ? (this.selectedObjects[0].y + (this.selectedObjects[0].height || bounds.height) / 2) : ((bounds.minY + bounds.maxY) / 2)
                            };
                            this.initialRotations = this.selectedObjects.map(o => o.rotation || 0);
                            this.initialRotateAngle = Math.atan2(world.y - this.rotateCenter.y, world.x - this.rotateCenter.x);
                            this.canvas.style.cursor = 'grabbing';
                            window.soundManager.playClick();
                            try { this.canvas.setPointerCapture(e.pointerId); } catch(err) {}
                            return;
                        }
                        this.isResizingObject = true;
                        this.resizeHandle = h.type;
                        this.resizeStart = { x: world.x, y: world.y };
                        this.initialCompoundBounds = this.selectedObjects.length === 1 
                            ? this.getObjectBounds(this.selectedObjects[0]) 
                            : this.getCompoundBounds(this.selectedObjects);
                        this.initialObjectsState = JSON.parse(JSON.stringify(this.selectedObjects));
                        window.soundManager.playClick();
                        try { this.canvas.setPointerCapture(e.pointerId); } catch(err) {}
                        return;
                    }
                }
            }

            // 2. Check quiz interaction
            for (let i = this.objects.length - 1; i >= 0; i--) {
                const obj = this.objects[i];
                if (obj.type === 'quiz' && this.isPointInObject(world.x, world.y, obj)) {
                    this.handleQuizInteraction(world.x, world.y, obj);
                    this.render();
                    return;
                }
            }

            // Format Painter Click Handling: If active, applying style to clicked object
            if (this.formatPainterActive && this.copiedFormat) {
                const hitObj = this.findObjectAt(world.x, world.y);
                if (hitObj) {
                    this.pasteFormat(hitObj);
                    this.selectedObjects = [hitObj];
                    this.selectedObject = hitObj;
                    this.triggerPropertySync(this.selectedObject);
                    return;
                }
            }

            // Text Transfer Click Handling: If long-pressed text was copied, replace text in clicked target box
            if (this.textTransferActive && this.longPressCopiedText) {
                const targetBox = this.findObjectAt(world.x, world.y);
                if (targetBox && targetBox !== this.longPressSourceObj && this.isEditableObject(targetBox)) {
                    this.saveUndoState();
                    this.replaceObjectText(targetBox, this.longPressCopiedText);
                    this.selectedObjects = [targetBox];
                    this.selectedObject = targetBox;
                    this.triggerPropertySync(this.selectedObject);
                    this.render();
                    this.autoSave();
                    if (window.soundManager) window.soundManager.playChime();
                    this.showToast('✨ Text replaced in new box!');
                    this.textTransferActive = false;
                    this.longPressCopiedText = null;
                    this.longPressSourceObj = null;
                    return;
                }
            }

            // Set up Long-Press / Long-Tap Timer to copy box text
            if (this.longPressTimer) {
                clearTimeout(this.longPressTimer);
                this.longPressTimer = null;
            }
            const pressedBox = this.findObjectAt(world.x, world.y);
            if (pressedBox && this.isEditableObject(pressedBox)) {
                this.longPressTarget = pressedBox;
                this.longPressStartScreen = { x: screenX, y: screenY };
                this.longPressTimer = setTimeout(() => {
                    this.longPressTimer = null;
                    if (this.longPressTarget) {
                        const txt = this.extractObjectText(this.longPressTarget);
                        if (txt && txt.trim().length > 0) {
                            this.longPressCopiedText = txt;
                            this.longPressSourceObj = this.longPressTarget;
                            this.textTransferActive = true;
                            this.isDraggingSelection = false;
                            if (navigator.clipboard && navigator.clipboard.writeText) {
                                navigator.clipboard.writeText(txt).catch(() => {});
                            }
                            if (window.soundManager) window.soundManager.playPop();
                            if (navigator.vibrate) navigator.vibrate([40, 60, 40]);
                            this.showToast('📋 Box text copied! Tap/click on another box to replace its text');
                            this.selectedObjects = [this.longPressTarget];
                            this.selectedObject = this.longPressTarget;
                            this.triggerPropertySync(this.selectedObject);
                            this.render();
                        }
                    }
                }, 480);
            }

            // 3. Check if clicked inside currently selected items or compound bounds -> start drag/shift
            if (this.selectedObjects && this.selectedObjects.length > 0 && this.isPointInSelection(world.x, world.y)) {
                this.saveUndoState();
                this.isDraggingSelection = true;
                this.lastDragWorld = { x: world.x, y: world.y };
                window.soundManager.playClick();
                return;
            }

            // 4. Clicked on an unselected object -> single select and start drag
            const hitObj = this.findObjectAt(world.x, world.y);
            if (hitObj) {
                this.selectedObjects = [hitObj];
                this.selectedObject = hitObj;
                this.saveUndoState();
                this.isDraggingSelection = true;
                this.lastDragWorld = { x: world.x, y: world.y };
                window.soundManager.playClick();
                this.triggerPropertySync(this.selectedObject);
                this.render();
                return;
            }

            // 5. Clicked on empty canvas -> clear selection & start new marquee selection
            this.selectedObjects = [];
            this.selectedObject = null;
            this.triggerPropertySync(null);
            this.isSelectingArea = true;
            this.selectionBox = {
                startX: world.x,
                startY: world.y,
                currentX: world.x,
                currentY: world.y,
                preserveExisting: false
            };
            this.render();
            return;
        }

        if (this.activeTool === 'laser') {
            this.isDrawing = true;
            this.laserTrail = [{ x: screenX, y: screenY, time: Date.now() }];
            return;
        }

        if (this.activeTool === 'text') {
            const hitObj = this.findObjectAt(world.x, world.y);
            if (hitObj && this.isEditableObject(hitObj)) {
                this.editObjectInline(hitObj, world.x, world.y);
            } else {
                const isMobile = window.innerWidth <= 768 || ('ontouchstart' in window && window.innerWidth <= 1024);
                if (isMobile) {
                    this.addBlankAISolutionCard(world.x, world.y);
                } else {
                    this.createInlineTextEditor(screenX, screenY, world.x, world.y);
                }
            }
            return;
        }

        if (this.activeTool === 'sticky') {
            this.addStickyNote(world.x, world.y);
            return;
        }

        // Start drawing stroke
        this.saveUndoState();
        this.isDrawing = true;

        const pressure = (e.pressure && e.pressure > 0) ? e.pressure : 0.5;

        if (['pen', 'pencil', 'brush', 'highlighter'].includes(this.activeTool)) {
            let strokeColor = this.strokeColor;
            let strokeWidth = this.strokeWidth;
            let opacity = 1.0;

            if (this.activeTool === 'pencil') {
                strokeWidth = Math.max(1.5, this.strokeWidth * 0.6);
                opacity = 0.8;
            } else if (this.activeTool === 'highlighter') {
                strokeWidth = Math.max(16, this.strokeWidth * 4.5);
                opacity = 0.4;
            } else if (this.activeTool === 'brush') {
                strokeWidth = this.strokeWidth * 1.5;
            }

            this.currentStroke = {
                type: 'freehand',
                tool: this.activeTool,
                points: [{ x: world.x, y: world.y, pressure: pressure, time: Date.now() }],
                strokeColor: strokeColor,
                strokeWidth: strokeWidth,
                opacity: opacity,
                strokeDash: this.strokeDash
            };
            this.lastPoint = { x: world.x, y: world.y };
            window.soundManager.playDrawStroke();
        } else if (['rect', 'ellipse', 'triangle', 'diamond', 'star'].includes(this.activeTool)) {
            this.currentStroke = {
                type: this.activeTool,
                x: world.x,
                y: world.y,
                width: 0,
                height: 0,
                strokeColor: this.strokeColor,
                fillColor: this.fillColor,
                strokeWidth: this.strokeWidth,
                strokeDash: this.strokeDash
            };
        } else if (['line', 'arrow', 'curve', 'curve-arrow'].includes(this.activeTool)) {
            this.currentStroke = {
                type: this.activeTool,
                x1: world.x,
                y1: world.y,
                x2: world.x,
                y2: world.y,
                strokeColor: this.strokeColor,
                strokeWidth: this.strokeWidth,
                strokeDash: this.strokeDash,
                arrowEnd: (this.activeTool === 'arrow' || this.activeTool === 'curve-arrow'),
                curvature: 0.22
            };
        } else if (this.activeTool === 'eraser') {
            this.eraseAt(world.x, world.y);
        }
    }

    onPointerMove(e) {
        const rect = this.canvas.getBoundingClientRect();
        const screenX = e.clientX - rect.left;
        const screenY = e.clientY - rect.top;
        const world = this.screenToWorld(screenX, screenY);
        this.mousePos = world;
        this.screenMousePos = { x: screenX, y: screenY };

        // Cancel long-press timer if pointer moves beyond threshold (drag/drawing)
        if (this.longPressTimer && this.longPressStartScreen) {
            const dist = Math.hypot(screenX - this.longPressStartScreen.x, screenY - this.longPressStartScreen.y);
            if (dist > 8) {
                clearTimeout(this.longPressTimer);
                this.longPressTimer = null;
            }
        }

        if (this.isPanning) {
            this.panX = e.clientX - this.panStart.x;
            this.panY = e.clientY - this.panStart.y;
            this.requestRender();
            return;
        }

        if (this.activeTool === 'laser' && this.isDrawing) {
            this.laserTrail.push({ x: screenX, y: screenY, time: Date.now() });
            return;
        }

        // 0. Rotating selection via rotation handle
        if (this.isRotatingObject && this.selectedObjects && this.selectedObjects.length > 0 && this.rotateCenter) {
            const curAngle = Math.atan2(world.y - this.rotateCenter.y, world.x - this.rotateCenter.x);
            let deltaAngle = curAngle - this.initialRotateAngle;

            this.selectedObjects.forEach((obj, idx) => {
                let newAngle = (this.initialRotations[idx] || 0) + deltaAngle;
                
                // Snap to 0, 15, 30, 45, 90, 180, 270 deg
                const deg = (((newAngle * 180 / Math.PI) % 360) + 360) % 360;
                const snapThreshold = e.shiftKey ? 8 : 4;
                const snapAngles = [0, 15, 30, 45, 60, 75, 90, 105, 120, 135, 150, 165, 180, 195, 210, 225, 240, 255, 270, 285, 300, 315, 330, 345, 360];
                for (const snap of snapAngles) {
                    if (Math.abs(deg - snap) < snapThreshold || Math.abs(deg - (snap - 360)) < snapThreshold) {
                        newAngle = (snap * Math.PI) / 180;
                        break;
                    }
                }
                
                obj.rotation = newAngle;
                this.currentRotationAngleDeg = Math.round((((newAngle * 180 / Math.PI) % 360) + 360) % 360);
            });

            this.requestRender();
            return;
        }

        // 1. Resizing selection via 8 handles
        if (this.isResizingObject && this.selectedObjects && this.selectedObjects.length > 0 && this.initialCompoundBounds && this.initialObjectsState) {
            const dx = world.x - this.resizeStart.x;
            const dy = world.y - this.resizeStart.y;
            const ib = this.initialCompoundBounds;
            const handle = this.resizeHandle;

            let newMinX = ib.minX;
            let newMinY = ib.minY;
            let newMaxX = ib.maxX;
            let newMaxY = ib.maxY;

            if (handle.includes('e')) newMaxX = Math.max(newMinX + 20, ib.maxX + dx);
            if (handle.includes('s')) newMaxY = Math.max(newMinY + 20, ib.maxY + dy);
            if (handle.includes('w')) newMinX = Math.min(newMaxX - 20, ib.minX + dx);
            if (handle.includes('n')) newMinY = Math.min(newMaxY - 20, ib.minY + dy);

            const newW = Math.max(20, newMaxX - newMinX);
            const newH = Math.max(20, newMaxY - newMinY);
            const scaleX = newW / ib.width;
            const scaleY = newH / ib.height;

            this.selectedObjects.forEach((obj, idx) => {
                const initObj = this.initialObjectsState[idx];
                if (!initObj) return;

                if (obj.points && obj.points.length > 0) {
                    obj.points = initObj.points.map(p => ({
                        ...p,
                        x: newMinX + ((p.x - ib.minX) / ib.width) * newW,
                        y: newMinY + ((p.y - ib.minY) / ib.height) * newH
                    }));
                } else if (obj.x1 !== undefined && obj.x2 !== undefined) {
                    obj.x1 = newMinX + ((initObj.x1 - ib.minX) / ib.width) * newW;
                    obj.y1 = newMinY + ((initObj.y1 - ib.minY) / ib.height) * newH;
                    obj.x2 = newMinX + ((initObj.x2 - ib.minX) / ib.width) * newW;
                    obj.y2 = newMinY + ((initObj.y2 - ib.minY) / ib.height) * newH;
                    if (initObj.cx !== undefined) {
                        obj.cx = newMinX + ((initObj.cx - ib.minX) / ib.width) * newW;
                        obj.cy = newMinY + ((initObj.cy - ib.minY) / ib.height) * newH;
                    }
                } else if (obj.type === 'ellipse' || obj.type === 'circle') {
                    const initRx = initObj.radiusX || Math.abs(initObj.width || 60) / 2;
                    const initRy = initObj.radiusY || Math.abs(initObj.height || 60) / 2;
                    const initCx = initObj.radiusX ? initObj.x : initObj.x + (initObj.width || 0) / 2;
                    const initCy = initObj.radiusY ? initObj.y : initObj.y + (initObj.height || 0) / 2;
                    
                    const newCx = newMinX + ((initCx - ib.minX) / ib.width) * newW;
                    const newCy = newMinY + ((initCy - ib.minY) / ib.height) * newH;
                    const newRx = Math.max(10, initRx * scaleX);
                    const newRy = Math.max(10, initRy * scaleY);

                    if (initObj.radiusX) {
                        obj.x = newCx;
                        obj.y = newCy;
                        obj.radiusX = newRx;
                        obj.radiusY = newRy;
                    } else {
                        obj.x = newCx - newRx;
                        obj.y = newCy - newRy;
                        obj.width = newRx * 2;
                        obj.height = newRy * 2;
                    }
                } else {
                    obj.x = newMinX + ((initObj.x - ib.minX) / ib.width) * newW;
                    obj.y = newMinY + ((initObj.y - ib.minY) / ib.height) * newH;
                    obj.width = Math.max(10, (initObj.width || 100) * scaleX);
                    obj.height = Math.max(10, (initObj.height || 100) * scaleY);

                    if (obj.type === 'text' && initObj.fontSize) {
                        obj.fontSize = Math.max(10, Math.round(initObj.fontSize * Math.min(scaleX, scaleY)));
                    }
                }
            });

            this.requestRender();
            return;
        }

        // 2. Dragging & shifting all selected objects together
        if (this.isDraggingSelection && this.selectedObjects && this.selectedObjects.length > 0) {
            const dx = world.x - this.lastDragWorld.x;
            const dy = world.y - this.lastDragWorld.y;
            this.lastDragWorld = { x: world.x, y: world.y };

            this.selectedObjects.forEach(obj => {
                if (obj.points) {
                    obj.points.forEach(p => { p.x += dx; p.y += dy; });
                } else if (obj.x1 !== undefined) {
                    obj.x1 += dx; obj.y1 += dy;
                    obj.x2 += dx; obj.y2 += dy;
                    if (obj.cx !== undefined) { obj.cx += dx; obj.cy += dy; }
                    if (obj.x3 !== undefined) { obj.x3 += dx; obj.y3 += dy; }
                } else {
                    if (obj.x !== undefined) obj.x += dx;
                    if (obj.y !== undefined) obj.y += dy;
                }
            });
            this.requestRender();
            return;
        }

        // 3. Marquee Area Selection dragging
        if (this.isSelectingArea && this.selectionBox) {
            this.selectionBox.currentX = world.x;
            this.selectionBox.currentY = world.y;

            const minX = Math.min(this.selectionBox.startX, world.x);
            const maxX = Math.max(this.selectionBox.startX, world.x);
            const minY = Math.min(this.selectionBox.startY, world.y);
            const maxY = Math.max(this.selectionBox.startY, world.y);
            const box = { minX, minY, maxX, maxY };

            const newlyEnclosed = this.objects.filter(obj => {
                const b = this.getObjectBounds(obj);
                if (!b) return false;
                return !(b.maxX < box.minX || b.minX > box.maxX || b.maxY < box.minY || b.minY > box.maxY);
            });

            if (this.selectionBox.preserveExisting && this.selectionBox.initialSelection) {
                const combined = new Set([...this.selectionBox.initialSelection, ...newlyEnclosed]);
                this.selectedObjects = Array.from(combined);
            } else {
                this.selectedObjects = newlyEnclosed;
            }
            this.selectedObject = this.selectedObjects.length > 0 ? this.selectedObjects[0] : null;
            this.requestRender();
            return;
        }

        // 4. Cursor Feedback in Select Mode
        if (this.activeTool === 'select' && !this.isDrawing && !this.isDraggingSelection && !this.isResizingObject && !this.isSelectingArea) {
            if (this.selectedObjects && this.selectedObjects.length > 0) {
                const handles = this.getSelectionHandles();
                const hitRadius = 14 / this.scale;
                let foundCursor = null;
                for (let h of handles) {
                    if (Math.hypot(world.x - h.x, world.y - h.y) <= hitRadius) {
                        foundCursor = h.cursor;
                        break;
                    }
                }
                if (foundCursor) {
                    this.canvas.style.cursor = foundCursor;
                    return;
                } else if (this.isPointInSelection(world.x, world.y)) {
                    this.canvas.style.cursor = 'move';
                    return;
                }
            }
            if (this.findObjectAt(world.x, world.y)) {
                this.canvas.style.cursor = 'pointer';
                return;
            }
            this.canvas.style.cursor = 'default';
        }

        if (!this.isDrawing || !this.currentStroke) {
            if (this.activeTool === 'eraser' && (e.buttons === 1)) {
                this.eraseAt(world.x, world.y);
            }
            return;
        }

        // Sub-pixel coalesced events handling for silky smooth drawing
        const events = e.getCoalescedEvents ? e.getCoalescedEvents() : [e];

        if (this.currentStroke.type === 'freehand') {
            const minDist = Math.max(1.0, 1.4 / this.scale);
            for (let evt of events) {
                const sX = evt.clientX - rect.left;
                const sY = evt.clientY - rect.top;
                const wPt = this.screenToWorld(sX, sY);
                const pressure = (evt.pressure && evt.pressure > 0) ? evt.pressure : 0.5;

                const last = this.currentStroke.points[this.currentStroke.points.length - 1];
                const dist = Math.hypot(wPt.x - last.x, wPt.y - last.y);
                if (dist >= minDist) {
                    this.currentStroke.points.push({
                        x: wPt.x,
                        y: wPt.y,
                        pressure: pressure,
                        time: Date.now()
                    });
                }
            }
        } else if (['rect', 'ellipse', 'triangle', 'diamond', 'star'].includes(this.currentStroke.type)) {
            this.currentStroke.width = world.x - this.currentStroke.x;
            this.currentStroke.height = world.y - this.currentStroke.y;
        } else if (['line', 'arrow', 'curve', 'curve-arrow'].includes(this.currentStroke.type)) {
            this.currentStroke.x2 = world.x;
            this.currentStroke.y2 = world.y;
        }

        this.requestRender();
    }

    onPointerUp(e) {
        if (this.longPressTimer) {
            clearTimeout(this.longPressTimer);
            this.longPressTimer = null;
        }

        if (this.isPanning) {
            this.isPanning = false;
            try { this.canvas.releasePointerCapture(e.pointerId); } catch(err) {}
            return;
        }

        if (this.isRotatingObject) {
            this.isRotatingObject = false;
            this.currentRotationAngleDeg = null;
            this.rotateCenter = null;
            this.initialRotations = null;
            try { this.canvas.releasePointerCapture(e.pointerId); } catch(err) {}
            this.autoSave();
            this.render();
            return;
        }

        if (this.isResizingObject) {
            this.isResizingObject = false;
            this.resizeHandle = null;
            this.initialCompoundBounds = null;
            this.initialObjectsState = null;
            try { this.canvas.releasePointerCapture(e.pointerId); } catch(err) {}

            this.autoSave();
            this.render();
            return;
        }

        if (this.isDraggingSelection) {
            this.isDraggingSelection = false;
            try { this.canvas.releasePointerCapture(e.pointerId); } catch(err) {}

            this.autoSave();
            this.render();
            return;
        }

        if (this.isSelectingArea) {
            this.isSelectingArea = false;
            try { this.canvas.releasePointerCapture(e.pointerId); } catch(err) {}
            const dist = Math.hypot(
                (this.selectionBox ? this.selectionBox.currentX - this.selectionBox.startX : 0),
                (this.selectionBox ? this.selectionBox.currentY - this.selectionBox.startY : 0)
            );
            if (dist < 6) {
                this.selectedObjects = [];
                this.selectedObject = null;
            } else if (this.selectedObjects && this.selectedObjects.length > 0) {
                window.soundManager.playPop();
            }
            this.selectionBox = null;
            this.render();
            return;
        }

        if (this.activeTool === 'laser') {
            this.isDrawing = false;
            try { this.canvas.releasePointerCapture(e.pointerId); } catch(err) {}
            return;
        }

        if (this.isDrawing && this.currentStroke) {
            this.isDrawing = false;
            try { this.canvas.releasePointerCapture(e.pointerId); } catch(err) {}

            // Smart Shape Detection (AI Auto-snap)
            if (this.smartShapeDetection && this.currentStroke.type === 'freehand' && this.currentStroke.points.length > 8 && this.currentStroke.tool !== 'highlighter') {
                const detectedShape = this.recognizeShape(this.currentStroke.points);
                if (detectedShape) {
                    this.currentStroke = {
                        ...detectedShape,
                        strokeColor: this.strokeColor,
                        fillColor: this.fillColor,
                        strokeWidth: this.strokeWidth,
                        strokeDash: this.strokeDash
                    };
                    window.soundManager.playSnap();
                }
            }

            if (this.isValidStroke(this.currentStroke)) {
                this.objects.push(this.currentStroke);
                window.soundManager.playPop();
                this.autoSave();
            }
            this.currentStroke = null;
            this.render();
        }
    }

    isEditableObject(obj) {
        if (!obj) return false;
        if (['text', 'sticky', 'latex', 'quiz', 'element', 'lens', 'table'].includes(obj.type)) return true;
        if (typeof obj.text === 'string' || typeof obj.latex === 'string' || typeof obj.label === 'string' || typeof obj.title === 'string' || typeof obj.question === 'string' || typeof obj.query === 'string' || typeof obj.desc === 'string') return true;
        if (['rectangle', 'rect', 'circle', 'ellipse', 'diamond', 'triangle', 'star'].includes(obj.type)) return true;
        return false;
    }

    extractObjectText(obj) {
        if (!obj) return '';
        if (obj.type === 'latex') return obj.latex || obj.text || '';
        if (obj.type === 'quiz') {
            const q = obj.question || '';
            const opts = Array.isArray(obj.options) ? obj.options.map((opt, i) => `${String.fromCharCode(65 + i)}) ${opt}`).join('\n') : '';
            const expl = obj.explanation ? `\n\n💡 Explanation: ${obj.explanation}` : '';
            return `❓ ${q}\n\n${opts}${expl}`.trim();
        }
        if (obj.type === 'element') {
            const sym = obj.symbol || '';
            const name = obj.name || '';
            const num = obj.atomicNumber ? ` (Atomic #${obj.atomicNumber})` : '';
            const cat = obj.category ? `\nCategory: ${obj.category}` : '';
            const desc = obj.desc ? `\n${obj.desc}` : '';
            return `${sym} - ${name}${num}${cat}${desc}`.trim();
        }
        if (obj.type === 'lens') return obj.query || obj.text || '';
        return obj.text || obj.latex || obj.label || obj.title || obj.query || obj.desc || '';
    }

    replaceObjectText(obj, newText) {
        if (!obj || newText === undefined || newText === null) return;
        obj.text = newText;
        if (obj.type === 'latex') {
            obj.latex = newText;
        } else if (obj.type === 'quiz') {
            const lines = newText.split('\n').filter(l => l.trim().length > 0);
            if (lines.length > 0) {
                obj.question = lines[0].replace(/^❓\s*/, '');
                const optLines = lines.filter(l => /^[A-D]\)\s*/.test(l));
                if (optLines.length > 0) {
                    obj.options = optLines.map(l => l.replace(/^[A-D]\)\s*/, ''));
                }
                const explLine = lines.find(l => l.includes('Explanation:'));
                if (explLine) {
                    obj.explanation = explLine.replace(/.*Explanation:\s*/, '');
                }
            }
        } else if (obj.type === 'element') {
            obj.desc = newText;
        } else if (obj.type === 'lens') {
            obj.query = newText;
            if (typeof this.triggerLensScan === 'function') {
                this.triggerLensScan(obj, newText);
            }
        } else {
            if (obj.label !== undefined) obj.label = newText;
            if (obj.title !== undefined) obj.title = newText;
        }

        if (obj._originalLangData) {
            obj._originalLangData.text = obj.text;
            if (obj.latex !== undefined) obj._originalLangData.latex = obj.latex;
            if (obj.question !== undefined) obj._originalLangData.question = obj.question;
            if (obj.options !== undefined && Array.isArray(obj.options)) obj._originalLangData.options = [...obj.options];
            if (obj.explanation !== undefined) obj._originalLangData.explanation = obj.explanation;
            if (obj.label !== undefined) obj._originalLangData.label = obj.label;
            if (obj.title !== undefined) obj._originalLangData.title = obj.title;
            if (obj.query !== undefined) obj._originalLangData.query = obj.query;
        }
    }

    onDoubleClick(e) {
        const rect = this.canvas.getBoundingClientRect();
        const screenX = e.clientX - rect.left;
        const screenY = e.clientY - rect.top;
        const world = this.screenToWorld(screenX, screenY);

        const hitObj = this.findObjectAt(world.x, world.y);
        if (hitObj && this.isEditableObject(hitObj)) {
            this.editObjectInline(hitObj, world.x, world.y);
        } else {
            // Double click anywhere on canvas creates new text at that exact place!
            this.createInlineTextEditor(screenX, screenY, world.x, world.y);
        }
    }

    onWheel(e) {
        e.preventDefault();
        const rect = this.canvas.getBoundingClientRect();
        const mouseScreenX = e.clientX - rect.left;
        const mouseScreenY = e.clientY - rect.top;

        if (e.ctrlKey || e.metaKey) {
            // Pinch / Ctrl + Wheel Zoom
            const zoomFactor = e.deltaY < 0 ? 1.08 : 0.92;
            const newScale = Math.min(Math.max(this.scale * zoomFactor, this.minScale), this.maxScale);

            this.panX = mouseScreenX - (mouseScreenX - this.panX) * (newScale / this.scale);
            this.panY = mouseScreenY - (mouseScreenY - this.panY) * (newScale / this.scale);
            this.scale = newScale;
        } else {
            // Trackpad / Wheel Pan
            this.panX -= e.deltaX;
            this.panY -= e.deltaY;
        }

        this.updateZoomDisplay();
        this.requestRender();
    }

    // --- Responsive Modern Text & Large AI Content Editor Modal ---
    openModernContentEditor(obj, isNew = false, worldX = 0, worldY = 0) {
        let modal = document.getElementById('modernTextEditorModal');
        if (!modal) {
            // Fallback inline if modal container not in DOM
            this.createDesktopInlineEditor(window.innerWidth / 2 - 140, window.innerHeight / 2 - 60, worldX, worldY, obj, isNew);
            return;
        }

        const titleEl = document.getElementById('editorModalTitle');
        const textarea = document.getElementById('editorModalTextarea');
        const katexPreview = document.getElementById('editorKaTeXPreview');
        const katexOutput = document.getElementById('editorKaTeXOutput');
        const statsEl = document.getElementById('editorModalStats');
        const fontDisplay = document.getElementById('editor-font-display');
        const btnSave = document.getElementById('btn-editor-save');
        const btnCancel = document.getElementById('btn-editor-cancel');
        const btnClose = document.getElementById('btn-close-editor-modal');
        const btnFontInc = document.getElementById('btn-editor-font-increase');
        const btnFontDec = document.getElementById('btn-editor-font-decrease');
        const btnInsertStrike = document.getElementById('btn-editor-insert-strike');
        const btnInsertBullet = document.getElementById('btn-editor-insert-bullet');
        const btnInsertNumber = document.getElementById('btn-editor-insert-number');
        const btnInsertFormula = document.getElementById('btn-editor-insert-formula');
        const btnCopyText = document.getElementById('btn-editor-copy-text');

        let currentFontSize = (obj && obj.fontSize) ? obj.fontSize : (this.fontSize || 16);
        if (fontDisplay) fontDisplay.textContent = `${currentFontSize}px`;

        if (titleEl) {
            if (obj && obj.type === 'sticky') titleEl.textContent = '💡 Edit Note / AI Solution / Template Card';
            else if (obj && obj.type === 'quiz') titleEl.textContent = '❓ Edit MCQ Quiz Template';
            else if (obj && obj.type === 'latex') titleEl.textContent = '⚡ Edit LaTeX Math Equation';
            else if (obj && obj.type === 'element') titleEl.textContent = '🧪 Edit Chemistry Element Card';
            else if (obj && (obj.type === 'rectangle' || obj.type === 'circle' || obj.type === 'ellipse' || obj.type === 'table')) titleEl.textContent = '📐 Edit Template Section / Shape Text';
            else titleEl.textContent = '✏️ Edit Template / Whiteboard Content';
        }

        const initialText = obj ? this.extractObjectText(obj) : '';
        textarea.value = initialText;
        textarea.style.fontSize = `${Math.min(22, Math.max(13, currentFontSize))}px`;

        const updateStatsAndPreview = () => {
            const val = textarea.value;
            const chars = val.length;
            const words = val.trim() ? val.trim().split(/\s+/).length : 0;
            if (statsEl) statsEl.textContent = `${chars} chars • ${words} words`;

            if (katexPreview && katexOutput && window.katex) {
                const mathMatches = val.match(/\$([^$]+)\$/) || val.match(/\\(int|frac|sqrt|sum|alpha|beta|theta|pi|sin|cos|tan)/);
                if (mathMatches || (obj && obj.type === 'latex')) {
                    try {
                        const mathCode = (obj && obj.type === 'latex') ? val : (mathMatches ? mathMatches[1] || val : val);
                        window.katex.render(mathCode, katexOutput, { throwOnError: false, displayMode: true });
                        katexPreview.classList.remove('hidden');
                    } catch (e) {
                        katexPreview.classList.add('hidden');
                    }
                } else {
                    katexPreview.classList.add('hidden');
                }
            }
        };

        textarea.oninput = updateStatsAndPreview;
        updateStatsAndPreview();

        modal.classList.remove('hidden');
        modal.classList.add('flex');
        setTimeout(() => {
            textarea.focus();
            if (initialText) textarea.select();
        }, 60);

        const closeModal = () => {
            modal.classList.add('hidden');
            modal.classList.remove('flex');
        };

        if (btnClose) btnClose.onclick = closeModal;
        if (btnCancel) btnCancel.onclick = closeModal;

        if (btnFontInc) {
            btnFontInc.onclick = () => {
                currentFontSize = Math.min(84, currentFontSize + 2);
                if (fontDisplay) fontDisplay.textContent = `${currentFontSize}px`;
                const toolbarDisp = document.getElementById('toolbar-font-size-display');
                if (toolbarDisp) toolbarDisp.textContent = `${currentFontSize}px`;
                textarea.style.fontSize = `${Math.min(26, Math.max(13, currentFontSize))}px`;
            };
        }
        if (btnFontDec) {
            btnFontDec.onclick = () => {
                currentFontSize = Math.max(10, currentFontSize - 2);
                if (fontDisplay) fontDisplay.textContent = `${currentFontSize}px`;
                const toolbarDisp = document.getElementById('toolbar-font-size-display');
                if (toolbarDisp) toolbarDisp.textContent = `${currentFontSize}px`;
                textarea.style.fontSize = `${Math.min(26, Math.max(13, currentFontSize))}px`;
            };
        }

        if (btnInsertStrike) {
            btnInsertStrike.onclick = () => {
                const start = textarea.selectionStart;
                const end = textarea.selectionEnd;
                const text = textarea.value;
                if (start !== end) {
                    const sel = text.substring(start, end);
                    if (sel.startsWith('~~') && sel.endsWith('~~') && sel.length >= 4) {
                        textarea.value = text.substring(0, start) + sel.slice(2, -2) + text.substring(end);
                        textarea.selectionStart = start;
                        textarea.selectionEnd = end - 4;
                    } else {
                        textarea.value = text.substring(0, start) + '~~' + sel + '~~' + text.substring(end);
                        textarea.selectionStart = start;
                        textarea.selectionEnd = end + 4;
                    }
                } else {
                    const before = text.substring(0, start);
                    const after = text.substring(start);
                    const lineStart = before.lastIndexOf('\n') + 1;
                    const lineEndRel = after.indexOf('\n');
                    const lineEnd = lineEndRel === -1 ? text.length : start + lineEndRel;
                    const lineText = text.substring(lineStart, lineEnd);
                    if (lineText.startsWith('~~') && lineText.endsWith('~~') && lineText.length >= 4) {
                        const unwrapped = lineText.slice(2, -2);
                        textarea.value = text.substring(0, lineStart) + unwrapped + text.substring(lineEnd);
                        textarea.selectionStart = textarea.selectionEnd = Math.max(0, start - 2);
                    } else if (lineText.trim()) {
                        const wrapped = `~~${lineText}~~`;
                        textarea.value = text.substring(0, lineStart) + wrapped + text.substring(lineEnd);
                        textarea.selectionStart = textarea.selectionEnd = start + 2;
                    } else {
                        textarea.value = text.substring(0, start) + '~~Completed task~~' + text.substring(end);
                        textarea.selectionStart = start + 2;
                        textarea.selectionEnd = start + 16;
                    }
                }
                textarea.focus();
                updateStatsAndPreview();
                if (window.soundManager) window.soundManager.playPop();
            };
        }

        if (btnInsertBullet) {
            btnInsertBullet.onclick = () => {
                const start = textarea.selectionStart;
                const end = textarea.selectionEnd;
                const text = textarea.value;
                if (start !== end) {
                    const sel = text.substring(start, end);
                    const lines = sel.split('\n');
                    const allBulleted = lines.every(l => !l.trim() || l.trim().startsWith('• '));
                    const newLines = lines.map(l => {
                        if (!l.trim()) return l;
                        return allBulleted ? l.replace(/^\s*(•|-|\*|\d+\.)\s*/, '') : `• ${l.replace(/^\s*(•|-|\*|\d+\.)\s*/, '')}`;
                    });
                    const replaced = newLines.join('\n');
                    textarea.value = text.substring(0, start) + replaced + text.substring(end);
                    textarea.selectionStart = start;
                    textarea.selectionEnd = start + replaced.length;
                } else {
                    const before = text.substring(0, start);
                    const after = text.substring(start);
                    const lineStart = before.lastIndexOf('\n') + 1;
                    const lineEndRel = after.indexOf('\n');
                    const lineEnd = lineEndRel === -1 ? text.length : start + lineEndRel;
                    const lineText = text.substring(lineStart, lineEnd);
                    if (lineText.trim().startsWith('• ')) {
                        const unwrapped = lineText.replace(/^\s*•\s*/, '');
                        textarea.value = text.substring(0, lineStart) + unwrapped + text.substring(lineEnd);
                        textarea.selectionStart = textarea.selectionEnd = Math.max(0, start - 2);
                    } else {
                        const clean = lineText.replace(/^\s*(\d+\.|-|\*)\s*/, '');
                        const wrapped = `• ${clean || 'Bullet item'}`;
                        textarea.value = text.substring(0, lineStart) + wrapped + text.substring(lineEnd);
                        textarea.selectionStart = textarea.selectionEnd = lineStart + wrapped.length;
                    }
                }
                textarea.focus();
                updateStatsAndPreview();
                if (window.soundManager) window.soundManager.playPop();
            };
        }

        if (btnInsertNumber) {
            btnInsertNumber.onclick = () => {
                const start = textarea.selectionStart;
                const end = textarea.selectionEnd;
                const text = textarea.value;
                if (start !== end) {
                    const sel = text.substring(start, end);
                    const lines = sel.split('\n');
                    const allNumbered = lines.every(l => !l.trim() || /^\s*\d+\.\s*/.test(l));
                    let counter = 1;
                    const newLines = lines.map(l => {
                        if (!l.trim()) return l;
                        return allNumbered ? l.replace(/^\s*\d+\.\s*/, '') : `${counter++}. ${l.replace(/^\s*(•|-|\*|\d+\.)\s*/, '')}`;
                    });
                    const replaced = newLines.join('\n');
                    textarea.value = text.substring(0, start) + replaced + text.substring(end);
                    textarea.selectionStart = start;
                    textarea.selectionEnd = start + replaced.length;
                } else {
                    const before = text.substring(0, start);
                    const after = text.substring(start);
                    const lineStart = before.lastIndexOf('\n') + 1;
                    const lineEndRel = after.indexOf('\n');
                    const lineEnd = lineEndRel === -1 ? text.length : start + lineEndRel;
                    const lineText = text.substring(lineStart, lineEnd);
                    if (/^\s*\d+\.\s*/.test(lineText)) {
                        const unwrapped = lineText.replace(/^\s*\d+\.\s*/, '');
                        textarea.value = text.substring(0, lineStart) + unwrapped + text.substring(lineEnd);
                        textarea.selectionStart = textarea.selectionEnd = Math.max(0, start - 3);
                    } else {
                        const clean = lineText.replace(/^\s*(•|-|\*|\d+\.)\s*/, '');
                        const wrapped = `1. ${clean || 'Numbered item'}`;
                        textarea.value = text.substring(0, lineStart) + wrapped + text.substring(lineEnd);
                        textarea.selectionStart = textarea.selectionEnd = lineStart + wrapped.length;
                    }
                }
                textarea.focus();
                updateStatsAndPreview();
                if (window.soundManager) window.soundManager.playPop();
            };
        }

        if (btnInsertFormula) {
            btnInsertFormula.onclick = () => {
                const start = textarea.selectionStart;
                const end = textarea.selectionEnd;
                const text = textarea.value;
                const formulaSnippet = 'f(x) = \\int_{a}^{b} \\sin(x) dx';
                textarea.value = text.substring(0, start) + formulaSnippet + text.substring(end);
                textarea.focus();
                updateStatsAndPreview();
            };
        }

        if (btnCopyText) {
            btnCopyText.onclick = () => {
                navigator.clipboard.writeText(textarea.value).then(() => {
                    this.showToast('📋 Text copied to clipboard!');
                });
            };
        }

        if (btnSave) {
            btnSave.onclick = () => {
                const text = textarea.value.trim();
                if (text) {
                    this.saveUndoState();
                    if (isNew) {
                        const newTextObj = {
                            type: 'text',
                            x: worldX,
                            y: worldY,
                            text: text,
                            fontSize: currentFontSize,
                            fontColor: this.strokeColor || '#1e293b',
                            fontWeight: 'normal'
                        };
                        this.addObject(newTextObj);
                        this.selectedObjects = [newTextObj];
                        this.selectedObject = newTextObj;
                    } else if (obj) {
                        obj.fontSize = currentFontSize;
                        if (obj.type === 'latex') {
                            obj.latex = text;
                            obj.text = text;
                        } else if (obj.type === 'quiz') {
                            const lines = text.split('\n').filter(l => l.trim().length > 0);
                            if (lines.length > 0) {
                                obj.question = lines[0].replace(/^❓\s*/, '');
                                const optLines = lines.filter(l => /^[A-D]\)\s*/.test(l));
                                if (optLines.length > 0) {
                                    obj.options = optLines.map(l => l.replace(/^[A-D]\)\s*/, ''));
                                }
                                const explLine = lines.find(l => l.includes('Explanation:'));
                                if (explLine) {
                                    obj.explanation = explLine.replace(/.*Explanation:\s*/, '');
                                }
                            }
                            obj.text = text;
                        } else if (obj.type === 'element') {
                            obj.desc = text;
                            obj.text = text;
                        } else if (obj.type === 'lens') {
                            obj.query = text;
                            this.triggerLensScan(obj, text);
                        } else {
                            obj.text = text;
                            if (obj.label !== undefined) obj.label = text;
                            if (obj.title !== undefined) obj.title = text;
                        }

                        // Synchronize original language cache
                        if (obj._originalLangData) {
                            obj._originalLangData.text = obj.text;
                            if (obj.latex !== undefined) obj._originalLangData.latex = obj.latex;
                            if (obj.question !== undefined) obj._originalLangData.question = obj.question;
                            if (obj.options !== undefined && Array.isArray(obj.options)) obj._originalLangData.options = [...obj.options];
                            if (obj.explanation !== undefined) obj._originalLangData.explanation = obj.explanation;
                            if (obj.label !== undefined) obj._originalLangData.label = obj.label;
                            if (obj.title !== undefined) obj._originalLangData.title = obj.title;
                            if (obj.query !== undefined) obj._originalLangData.query = obj.query;
                        }

                        this.selectedObjects = [obj];
                        this.selectedObject = obj;
                        this.render();
                        this.autoSave();
                    }
                    window.soundManager.playPop();
                }
                closeModal();
            };
        }
    }

    // --- Mobile Virtual Keyboard Viewport Auto-Pan & Focus Management ---
    setupKeyboardViewportAdjustment(input, worldX, worldY, isSticky = false, targetObj = null) {
        const isMobile = window.innerWidth <= 768 || ('ontouchstart' in window) || (navigator.maxTouchPoints && navigator.maxTouchPoints > 0);

        const repositionEditorElement = () => {
            const scaledFontSize = Math.max(12, ((targetObj && targetObj.fontSize) || this.fontSize || (isSticky ? 13 : 20)) * this.scale);
            const borderW = 1.5;
            const padX = 6;
            const padY = 4;
            const screenPos = this.worldToScreen(worldX, worldY);
            const vv = window.visualViewport;
            const vpW = vv ? vv.width : window.innerWidth;
            const vpH = vv ? vv.height : window.innerHeight;

            if (isSticky && targetObj) {
                const stickyScaledW = Math.max(80, (targetObj.width || 180) * this.scale);
                const stickyScaledH = Math.max(60, (targetObj.height || 160) * this.scale);
                const leftPos = Math.max(4, screenPos.x + 8 * this.scale);
                const topPos = Math.max(4, screenPos.y + 20 * this.scale);
                input.style.left = `${leftPos}px`;
                input.style.top = `${topPos}px`;
                const maxAvailW = Math.min(vpW - leftPos - 8, Math.max(60, stickyScaledW - 16 * this.scale));
                const maxAvailH = Math.min(vpH - topPos - 8, Math.max(40, stickyScaledH - 24 * this.scale));
                input.style.maxWidth = `${maxAvailW}px`;
                input.style.maxHeight = `${maxAvailH}px`;
            } else {
                const leftPos = Math.max(4, screenPos.x - padX - borderW);
                const topPos = Math.max(4, screenPos.y - (scaledFontSize * 0.96 + borderW + padY));
                input.style.left = `${leftPos}px`;
                input.style.top = `${topPos}px`;
                const maxAvailW = Math.max(120, vpW - leftPos - 12);
                const maxAvailH = Math.max(60, vpH - topPos - 16);
                input.style.maxWidth = `${maxAvailW}px`;
                input.style.maxHeight = `${maxAvailH}px`;
            }
        };

        const adjustForKeyboard = () => {
            if (!this.activeInlineEditor || this.activeInlineEditor.element !== input) return;

            const vv = window.visualViewport;
            const vpHeight = vv ? vv.height : window.innerHeight;
            const vpWidth = vv ? vv.width : window.innerWidth;
            const vpOffsetTop = vv ? vv.offsetTop : 0;
            const vpOffsetLeft = vv ? vv.offsetLeft : 0;

            const currentScreenPos = this.worldToScreen(worldX, worldY);
            
            // In mobile view or when visual viewport is contracted by virtual keyboard
            const isSmallScreen = window.innerWidth <= 768;
            const isKeyboardUp = vv ? (vv.height < window.innerHeight * 0.88) : false;

            if (isSmallScreen || isKeyboardUp || isMobile) {
                // Comfortable typing zone: upper 20%-32% of available visible height, clear of top bar (~54px)
                const targetScreenY = Math.max(70, Math.min(130, vpHeight * 0.28)) + vpOffsetTop;
                
                // If the element is below the comfort line or within danger of keyboard collision
                if (currentScreenPos.y > targetScreenY || currentScreenPos.y > (vpHeight - 140 + vpOffsetTop)) {
                    const diffY = targetScreenY - currentScreenPos.y;
                    this.panY += diffY;

                    // Ensure not pushed off-screen horizontally
                    if (currentScreenPos.x < 16 + vpOffsetLeft) {
                        this.panX += (24 + vpOffsetLeft - currentScreenPos.x);
                    } else if (currentScreenPos.x > (vpWidth - 80 + vpOffsetLeft)) {
                        this.panX += (vpWidth - 120 + vpOffsetLeft - currentScreenPos.x);
                    }

                    repositionEditorElement();
                    this.requestRender();
                } else {
                    repositionEditorElement();
                }
            } else {
                repositionEditorElement();
            }

            if (window.scrollY !== 0 || window.scrollX !== 0) {
                window.scrollTo(0, 0);
            }
        };

        const onViewportChange = () => adjustForKeyboard();

        if (window.visualViewport) {
            window.visualViewport.addEventListener('resize', onViewportChange);
            window.visualViewport.addEventListener('scroll', onViewportChange);
        }

        const t1 = setTimeout(adjustForKeyboard, 50);
        const t2 = setTimeout(adjustForKeyboard, 160);
        const t3 = setTimeout(adjustForKeyboard, 320);
        const t4 = setTimeout(adjustForKeyboard, 550);

        return {
            cleanup: () => {
                clearTimeout(t1);
                clearTimeout(t2);
                clearTimeout(t3);
                clearTimeout(t4);
                if (window.visualViewport) {
                    window.visualViewport.removeEventListener('resize', onViewportChange);
                    window.visualViewport.removeEventListener('scroll', onViewportChange);
                }
            },
            reposition: repositionEditorElement,
            adjust: adjustForKeyboard
        };
    }

    // --- In-Place Direct Text Editor ---
    createInlineTextEditor(screenX, screenY, worldX, worldY) {
        if (this.activeInlineEditor) {
            this.commitInlineEditor();
        }

        const container = this.canvas.parentElement || document.body;
        const containerW = container.clientWidth || window.innerWidth;
        const containerH = container.clientHeight || window.innerHeight;

        const scaledFontSize = Math.max(13, (this.fontSize || 22) * this.scale);
        const fontFam = this.fontFamily || "'Plus Jakarta Sans', system-ui, sans-serif";
        const fontWt = 'normal';
        const lineH = 1.4;
        const isDark = document.documentElement.classList.contains('dark') || document.body.classList.contains('dark');

        const padX = 6;
        const padY = 4;
        const borderW = 1.5;
        const leftPos = Math.max(4, screenX - padX - borderW);
        const topPos = Math.max(4, screenY - (scaledFontSize * 0.96 + borderW + padY));
        const maxAvailW = Math.max(140, containerW - leftPos - 20);
        const maxAvailH = Math.max(60, containerH - topPos - 20);

        const input = document.createElement('textarea');
        input.className = 'inline-whiteboard-editor absolute z-[60] outline-none resize-none font-sans transition-shadow';
        input.style.position = 'absolute';
        input.style.zIndex = '60';
        input.style.left = `${leftPos}px`;
        input.style.top = `${topPos}px`;
        input.style.maxWidth = `${maxAvailW}px`;
        input.style.maxHeight = `${maxAvailH}px`;
        input.style.fontFamily = fontFam;
        input.style.fontSize = `${scaledFontSize}px`;
        input.style.fontWeight = fontWt;
        input.style.lineHeight = `${lineH}`;
        input.style.color = this.strokeColor || (isDark ? '#f8fafc' : '#0f172a');
        input.style.background = isDark ? '#0f172a' : '#ffffff';
        input.style.border = '2px solid #6366f1';
        input.style.borderRadius = '6px';
        input.style.boxShadow = '0 6px 24px rgba(0, 0, 0, 0.28), 0 0 0 2px rgba(99, 102, 241, 0.4)';
        input.style.padding = `${padY}px ${padX}px`;
        input.style.margin = '0px';
        input.style.boxSizing = 'border-box';
        input.style.whiteSpace = 'pre-wrap';
        input.style.wordBreak = 'break-word';
        input.style.overflowWrap = 'break-word';
        input.style.overflowY = 'auto';
        input.style.overflowX = 'hidden';
        input.placeholder = 'Type text...';

        // Dim toolbars on mobile so text is 100% visible and unobstructed
        if (window.innerWidth <= 768) {
            document.getElementById('top-properties-bar')?.classList.add('opacity-15', 'pointer-events-none');
            document.getElementById('left-tools-dock')?.classList.add('opacity-15', 'pointer-events-none');
        }

        const keyboardHandler = this.setupKeyboardViewportAdjustment(input, worldX, worldY, false);

        const autoAdjustSize = () => {
            const val = input.value || input.placeholder || ' ';
            const lines = val.split('\n');
            this.ctx.save();
            this.ctx.font = `${fontWt} ${scaledFontSize}px ${fontFam}`;
            let maxLineW = 40;
            lines.forEach(l => {
                const w = this.ctx.measureText(l || ' ').width;
                if (w > maxLineW) maxLineW = w;
            });
            this.ctx.restore();

            const curMaxW = parseInt(input.style.maxWidth) || maxAvailW;
            const curMaxH = parseInt(input.style.maxHeight) || maxAvailH;
            const desiredW = Math.max(40, Math.min(Math.ceil(maxLineW + 20), curMaxW));
            input.style.width = `${desiredW}px`;

            input.style.height = '0px';
            const singleLineH = scaledFontSize * lineH;
            const contentH = Math.max(singleLineH + 8, input.scrollHeight + 4);
            const desiredH = Math.min(contentH, curMaxH);
            input.style.height = `${desiredH}px`;

            if (keyboardHandler) {
                keyboardHandler.adjust();
            }
        };

        autoAdjustSize();
        container.appendChild(input);

        this.activeInlineEditor = {
            element: input,
            worldX: worldX,
            worldY: worldY,
            isNew: true,
            keyboardHandler: keyboardHandler
        };

        this.render();

        setTimeout(() => {
            input.focus({ preventScroll: true });
            input.setSelectionRange(0, 0);
            input.scrollLeft = 0;
            input.scrollTop = 0;
            if (keyboardHandler) keyboardHandler.adjust();
        }, 50);

        input.addEventListener('pointerdown', (e) => e.stopPropagation());
        input.addEventListener('touchstart', (e) => e.stopPropagation(), { passive: true });
        input.addEventListener('touchend', (e) => e.stopPropagation());
        input.addEventListener('touchmove', (e) => e.stopPropagation(), { passive: true });

        input.addEventListener('input', autoAdjustSize);

        input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                this.commitInlineEditor();
            } else if (e.key === 'Escape') {
                this.cancelInlineEditor();
            }
        });

        input.addEventListener('blur', () => {
            setTimeout(() => {
                if (this.activeInlineEditor && this.activeInlineEditor.element === input) {
                    this.commitInlineEditor();
                }
            }, 80);
        });
    }

    editObjectInline(obj, clickWorldX = null, clickWorldY = null) {
        if (this.activeInlineEditor) {
            this.commitInlineEditor();
        }

        const screenPos = this.worldToScreen(obj.x, obj.y);
        const container = this.canvas.parentElement || document.body;
        const containerW = container.clientWidth || window.innerWidth;
        const containerH = container.clientHeight || window.innerHeight;

        const isDark = document.documentElement.classList.contains('dark') || document.body.classList.contains('dark');
        const isSticky = obj.type === 'sticky';
        const isBoxCard = ['sticky', 'quiz', 'element', 'lens', 'table'].includes(obj.type) || ((obj.width || 0) > 60 && (obj.height || 0) > 40);

        let fontFam = this.fontFamily || "'Plus Jakarta Sans', system-ui, sans-serif";
        let fontWt = obj.fontWeight || 'normal';
        let lineH = obj.lineHeight || 1.4;
        let scaledFontSize = Math.max(12, (obj.fontSize || this.fontSize || (isSticky ? 13 : 20)) * this.scale);
        let fontColor = obj.fontColor || obj.textColor || this.strokeColor || (isDark ? '#f8fafc' : '#0f172a');
        let initialText = this.extractObjectText(obj);

        const padX = isBoxCard ? 6 : 6;
        const padY = isBoxCard ? 4 : 4;
        const borderW = 1.5;

        let leftPos, topPos, maxAvailW, maxAvailH;

        if (isBoxCard) {
            const cardScaledW = Math.max(80, (obj.width || 180) * this.scale);
            const cardScaledH = Math.max(60, (obj.height || 160) * this.scale);
            leftPos = Math.max(4, screenPos.x + 8 * this.scale);
            topPos = Math.max(4, screenPos.y + (isSticky ? 20 : 10) * this.scale);
            maxAvailW = Math.min(containerW - leftPos - 8, Math.max(60, cardScaledW - 16 * this.scale));
            maxAvailH = Math.min(containerH - topPos - 8, Math.max(40, cardScaledH - 20 * this.scale));
        } else {
            leftPos = Math.max(4, screenPos.x - padX - borderW);
            topPos = Math.max(4, screenPos.y - (scaledFontSize * 0.96 + borderW + padY));
            maxAvailW = Math.max(120, containerW - leftPos - 12);
            maxAvailH = Math.max(60, containerH - topPos - 16);
        }

        const input = document.createElement('textarea');
        input.className = 'inline-whiteboard-editor absolute z-[60] outline-none resize-none font-sans transition-shadow';
        input.style.position = 'absolute';
        input.style.zIndex = '60';
        input.style.left = `${leftPos}px`;
        input.style.top = `${topPos}px`;
        input.style.maxWidth = `${maxAvailW}px`;
        input.style.maxHeight = `${maxAvailH}px`;
        input.style.fontFamily = fontFam;
        input.style.fontSize = `${scaledFontSize}px`;
        input.style.fontWeight = fontWt;
        input.style.lineHeight = `${lineH}`;
        input.style.color = fontColor;
        input.style.background = isSticky ? (obj.bgColor || '#fef08a') : (obj.fillColor && obj.fillColor !== 'transparent' ? obj.fillColor : (isDark ? '#0f172a' : '#ffffff'));
        input.style.border = isBoxCard ? '2px dashed rgba(99, 102, 241, 0.8)' : '2px solid #6366f1';
        input.style.borderRadius = '6px';
        input.style.boxShadow = isBoxCard ? '0 4px 16px rgba(0,0,0,0.18)' : '0 6px 24px rgba(0, 0, 0, 0.28), 0 0 0 2px rgba(99, 102, 241, 0.4)';
        input.style.padding = `${padY}px ${padX}px`;
        input.style.margin = '0px';
        input.style.boxSizing = 'border-box';
        input.style.whiteSpace = 'pre-wrap';
        input.style.wordBreak = 'break-word';
        input.style.overflowWrap = 'break-word';
        input.style.overflowY = 'auto';
        input.style.overflowX = 'hidden';
        input.value = initialText;
        if (!initialText) {
            input.placeholder = "Type note or solution here...";
        }

        // Dim toolbars on mobile so text is 100% visible and unobstructed
        if (window.innerWidth <= 768) {
            document.getElementById('top-properties-bar')?.classList.add('opacity-15', 'pointer-events-none');
            document.getElementById('left-tools-dock')?.classList.add('opacity-15', 'pointer-events-none');
        }

        const keyboardHandler = this.setupKeyboardViewportAdjustment(input, obj.x, obj.y, isBoxCard, obj);

        const autoAdjustSize = () => {
            if (isBoxCard) {
                input.style.width = `${maxAvailW}px`;
                input.style.height = `${maxAvailH}px`;
                if (keyboardHandler) keyboardHandler.adjust();
                return;
            }

            const lines = (input.value || ' ').split('\n');
            this.ctx.save();
            this.ctx.font = `${fontWt} ${scaledFontSize}px ${fontFam}`;
            let maxLineW = 30;
            lines.forEach(l => {
                const w = this.ctx.measureText(l || ' ').width;
                if (w > maxLineW) maxLineW = w;
            });
            this.ctx.restore();

            const curMaxW = parseInt(input.style.maxWidth) || maxAvailW;
            const curMaxH = parseInt(input.style.maxHeight) || maxAvailH;
            const desiredW = Math.max(40, Math.min(Math.ceil(maxLineW + 20), curMaxW));
            input.style.width = `${desiredW}px`;

            input.style.height = '0px';
            const singleLineH = scaledFontSize * lineH;
            const contentH = Math.max(singleLineH + 8, input.scrollHeight + 4);
            const desiredH = Math.min(contentH, curMaxH);
            input.style.height = `${desiredH}px`;

            if (keyboardHandler) {
                keyboardHandler.adjust();
            }
        };

        autoAdjustSize();
        container.appendChild(input);

        this.activeInlineEditor = {
            element: input,
            targetObject: obj,
            isNew: false,
            keyboardHandler: keyboardHandler
        };

        this.render();

        // Position cursor precisely at start or clicked word and keep view at top-left
        setTimeout(() => {
            input.focus({ preventScroll: true });
            const textVal = input.value;
            let caretPos = 0;

            if (clickWorldX !== null && clickWorldY !== null && textVal.length > 0) {
                const fs = obj.fontSize || (isSticky ? 13 : 20);
                const lh = fs * lineH;
                const lines = textVal.split('\n');
                const lineIdx = Math.max(0, Math.min(lines.length - 1, Math.floor((clickWorldY - (obj.y - fs)) / lh)));
                
                const charWidth = fs * 0.6;
                const colIdx = Math.max(0, Math.min(lines[lineIdx].length, Math.round((clickWorldX - obj.x) / charWidth)));
                
                let idxCount = 0;
                for (let i = 0; i < lineIdx; i++) {
                    idxCount += lines[i].length + 1;
                }
                caretPos = Math.min(textVal.length, Math.max(0, idxCount + colIdx));
            }

            input.setSelectionRange(caretPos, caretPos);
            input.scrollLeft = 0;
            input.scrollTop = 0;
            if (keyboardHandler) keyboardHandler.adjust();
        }, 50);

        input.addEventListener('pointerdown', (e) => e.stopPropagation());
        input.addEventListener('touchstart', (e) => e.stopPropagation(), { passive: true });
        input.addEventListener('touchend', (e) => e.stopPropagation());
        input.addEventListener('touchmove', (e) => e.stopPropagation(), { passive: true });

        input.addEventListener('input', autoAdjustSize);

        input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && !e.shiftKey && !isBoxCard) {
                e.preventDefault();
                this.commitInlineEditor();
            } else if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
                e.preventDefault();
                this.commitInlineEditor();
            } else if (e.key === 'Escape') {
                this.cancelInlineEditor();
            }
        });

        input.addEventListener('blur', () => {
            setTimeout(() => {
                if (this.activeInlineEditor && this.activeInlineEditor.element === input) {
                    this.commitInlineEditor();
                }
            }, 80);
        });
    }

    commitInlineEditor() {
        if (!this.activeInlineEditor) return;
        const { element, targetObject, worldX, worldY, isNew, keyboardHandler } = this.activeInlineEditor;
        const text = element.value;
        const trimmedText = text.trim();

        if (keyboardHandler && typeof keyboardHandler.cleanup === 'function') {
            keyboardHandler.cleanup();
        }

        if (trimmedText || targetObject) {
            this.saveUndoState();
            if (isNew && trimmedText) {
                const newTextObj = {
                    type: 'text',
                    x: worldX,
                    y: worldY,
                    text: trimmedText,
                    fontSize: this.fontSize || 22,
                    fontColor: this.strokeColor || '#1e293b',
                    fontWeight: 'normal',
                    lineHeight: 1.4
                };
                this.addObject(newTextObj);
                this.selectedObjects = [newTextObj];
                this.selectedObject = newTextObj;
            } else if (targetObject) {
                targetObject.text = text;
                if (targetObject.type === 'latex') {
                    targetObject.latex = text;
                } else if (targetObject.type === 'quiz') {
                    const lines = text.split('\n').filter(l => l.trim().length > 0);
                    if (lines.length > 0) {
                        targetObject.question = lines[0].replace(/^❓\s*/, '');
                        const optLines = lines.filter(l => /^[A-D]\)\s*/.test(l));
                        if (optLines.length > 0) {
                            targetObject.options = optLines.map(l => l.replace(/^[A-D]\)\s*/, ''));
                        }
                        const explLine = lines.find(l => l.includes('Explanation:'));
                        if (explLine) {
                            targetObject.explanation = explLine.replace(/.*Explanation:\s*/, '');
                        }
                    }
                } else if (targetObject.type === 'element') {
                    targetObject.desc = text;
                } else if (targetObject.type === 'lens') {
                    targetObject.query = text;
                    this.triggerLensScan(targetObject, text);
                } else {
                    if (targetObject.label !== undefined) targetObject.label = text;
                    if (targetObject.title !== undefined) targetObject.title = text;
                }

                // Synchronize pristine language cache
                if (targetObject._originalLangData) {
                    targetObject._originalLangData.text = targetObject.text;
                    if (targetObject.latex !== undefined) targetObject._originalLangData.latex = targetObject.latex;
                    if (targetObject.question !== undefined) targetObject._originalLangData.question = targetObject.question;
                    if (targetObject.options !== undefined && Array.isArray(targetObject.options)) targetObject._originalLangData.options = [...targetObject.options];
                    if (targetObject.explanation !== undefined) targetObject._originalLangData.explanation = targetObject.explanation;
                    if (targetObject.label !== undefined) targetObject._originalLangData.label = targetObject.label;
                    if (targetObject.title !== undefined) targetObject._originalLangData.title = targetObject.title;
                    if (targetObject.query !== undefined) targetObject._originalLangData.query = targetObject.query;
                }

                this.selectedObjects = [targetObject];
                this.selectedObject = targetObject;
                this.render();
                this.autoSave();
            }
            if (window.soundManager && typeof window.soundManager.playPop === 'function') {
                window.soundManager.playPop();
            }
        }

        element.remove();
        this.activeInlineEditor = null;
        document.getElementById('top-properties-bar')?.classList.remove('opacity-15', 'pointer-events-none');
        document.getElementById('left-tools-dock')?.classList.remove('opacity-15', 'pointer-events-none');
        this.render();
    }

    cancelInlineEditor() {
        if (!this.activeInlineEditor) return;
        const { element, keyboardHandler } = this.activeInlineEditor;
        if (keyboardHandler && typeof keyboardHandler.cleanup === 'function') {
            keyboardHandler.cleanup();
        }
        element.remove();
        this.activeInlineEditor = null;
        document.getElementById('top-properties-bar')?.classList.remove('opacity-15', 'pointer-events-none');
        document.getElementById('left-tools-dock')?.classList.remove('opacity-15', 'pointer-events-none');
        this.render();
    }

    addBlankAISolutionCard(x = null, y = null) {
        const center = this.getViewCenter();
        const isMobile = window.innerWidth <= 768 || ('ontouchstart' in window && window.innerWidth <= 1024);
        const cardWidth = isMobile ? Math.min(420, Math.max(280, (this.canvas.width / this.scale) * 0.82)) : 480;
        const cardHeight = isMobile ? 260 : 340;
        const posX = (x !== null) ? (x - cardWidth / 2) : (center.x - cardWidth / 2);
        const posY = (y !== null) ? (y - cardHeight / 2) : (center.y - cardHeight / 2);

        let bgColor = '#ede9fe';
        let textColor = '#4c1d95';
        const curLang = (window.languageManager && typeof window.languageManager.getCurrentLanguage === 'function') 
            ? window.languageManager.getCurrentLanguage() 
            : 'english';
        if (curLang === 'hinglish') {
            bgColor = '#fef3c7';
            textColor = '#92400e';
        } else if (curLang === 'hindi') {
            bgColor = '#ffedd5';
            textColor = '#9a3412';
        }

        const obj = {
            type: 'sticky',
            x: Math.round(posX),
            y: Math.round(posY),
            width: Math.round(cardWidth),
            height: Math.round(cardHeight),
            text: '',
            bgColor: bgColor,
            textColor: textColor,
            fontSize: 13
        };

        this.saveUndoState();
        this.addObject(obj);
        this.selectedObjects = [obj];
        this.selectedObject = obj;
        this.render();
        this.autoSave();

        if (window.soundManager && typeof window.soundManager.playPop === 'function') {
            window.soundManager.playPop();
        }

        // Open inline editor for immediate typing
        this.editObjectInline(obj, posX, posY);

        return obj;
    }

    addStickyNote(x, y) {
        const colors = ['#fef08a', '#dcfce7', '#dbeafe', '#fce7f3', '#fed7aa', '#ede9fe'];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        this.addObject({
            type: 'sticky',
            x: x - 90,
            y: y - 80,
            width: 190,
            height: 150,
            text: '📌 New Idea\n• Double click to edit',
            bgColor: randomColor,
            textColor: '#1e293b',
            fontSize: 14
        });
        window.soundManager.playPop();
    }

    // --- Drag-and-Drop Image & Animated GIF Motion Import System ---
    isGifFormat(src = '', mimeType = '', fileName = '') {
        if (mimeType === 'image/gif') return true;
        if (fileName && fileName.toLowerCase().endsWith('.gif')) return true;
        if (typeof src === 'string') {
            if (src.startsWith('data:image/gif')) return true;
            if (/\.gif(\?.*)?$/i.test(src)) return true;
            if (src.includes('image/gif') || src.includes('format=gif')) return true;
        }
        return false;
    }

    setupDragAndDrop() {
        const dropZone = this.canvas.parentElement || document.body;

        let dragOverlay = document.getElementById('canvas-drop-overlay');
        if (!dragOverlay) {
            dragOverlay = document.createElement('div');
            dragOverlay.id = 'canvas-drop-overlay';
            dragOverlay.className = 'absolute inset-0 z-50 hidden pointer-events-none bg-indigo-900/30 backdrop-blur-sm border-4 border-dashed border-indigo-500 rounded-3xl flex flex-col items-center justify-center text-white transition-all duration-200';
            dragOverlay.innerHTML = `
                <div class="p-8 bg-slate-900/90 dark:bg-slate-900/95 rounded-3xl shadow-2xl flex flex-col items-center gap-3.5 border border-indigo-400/40 transform scale-105 transition-transform animate-in fade-in zoom-in-95">
                    <div class="w-16 h-16 rounded-2xl bg-indigo-600/20 text-indigo-400 flex items-center justify-center text-3xl shadow-inner">
                        <i class="fa-solid fa-cloud-arrow-up animate-bounce"></i>
                    </div>
                    <span class="text-lg font-bold text-slate-100 tracking-tight">Drop Image or Animated GIF to Import</span>
                    <span class="text-xs text-indigo-300 font-medium bg-indigo-500/10 px-3 py-1 rounded-full border border-indigo-500/20">Supports Animated GIFs, PNG, JPG, WebP, SVG</span>
                </div>
            `;
            dropZone.appendChild(dragOverlay);
        }

        let dragCounter = 0;

        window.addEventListener('dragenter', (e) => {
            if (e.dataTransfer && e.dataTransfer.types && Array.from(e.dataTransfer.types).includes('Files')) {
                dragCounter++;
                dragOverlay.classList.remove('hidden');
            }
        });

        window.addEventListener('dragleave', (e) => {
            dragCounter--;
            if (dragCounter <= 0) {
                dragCounter = 0;
                dragOverlay.classList.add('hidden');
            }
        });

        window.addEventListener('dragover', (e) => {
            e.preventDefault();
            if (e.dataTransfer) e.dataTransfer.dropEffect = 'copy';
        });

        window.addEventListener('drop', (e) => {
            e.preventDefault();
            dragCounter = 0;
            dragOverlay.classList.add('hidden');

            const rect = this.canvas.getBoundingClientRect();
            const clientX = e.clientX;
            const clientY = e.clientY;
            let worldPos;
            if (clientX >= rect.left && clientX <= rect.right && clientY >= rect.top && clientY <= rect.bottom) {
                worldPos = this.screenToWorld(clientX - rect.left, clientY - rect.top);
            } else {
                worldPos = this.getViewCenter();
            }

            if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
                Array.from(e.dataTransfer.files).forEach((file, idx) => {
                    if (file.type.startsWith('image/') || file.name.toLowerCase().endsWith('.gif')) {
                        this.importImageFile(file, worldPos.x + idx * 30, worldPos.y + idx * 30);
                    }
                });
            } else {
                const html = e.dataTransfer.getData('text/html');
                const srcMatch = html ? html.match(/src\s*=\s*["']([^"']+)["']/i) : null;
                const uri = srcMatch ? srcMatch[1] : e.dataTransfer.getData('text/uri-list');
                if (uri && (uri.startsWith('http') || uri.startsWith('data:image'))) {
                    this.importImageFromUrl(uri, worldPos.x, worldPos.y);
                }
            }
        });
    }

    importImageFile(file, worldX, worldY) {
        const isGif = this.isGifFormat('', file.type, file.name);
        const reader = new FileReader();
        reader.onload = (evt) => {
            const dataUrl = evt.target.result;
            this.importImageFromUrl(dataUrl, worldX, worldY, isGif);
        };
        reader.readAsDataURL(file);
    }

    importImageFromUrl(src, worldX, worldY, isGifHint = false) {
        const isGif = isGifHint || this.isGifFormat(src);
        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.onload = () => {
            let w = img.naturalWidth || 400;
            let h = img.naturalHeight || 300;
            const maxDim = 520;
            if (w > maxDim || h > maxDim) {
                if (w > h) {
                    h = Math.round((h * maxDim) / w);
                    w = maxDim;
                } else {
                    w = Math.round((w * maxDim) / h);
                    h = maxDim;
                }
            }

            const posX = worldX !== undefined ? (worldX - w / 2) : (this.getViewCenter().x - w / 2);
            const posY = worldY !== undefined ? (worldY - h / 2) : (this.getViewCenter().y - h / 2);

            const imgObj = {
                id: 'gif_' + Date.now() + '_' + Math.random().toString(36).substr(2, 6),
                type: 'image',
                isGif: isGif,
                src: src,
                img: img,
                x: posX,
                y: posY,
                width: w,
                height: h
            };

            this.addObject(imgObj);
            this.selectedObjects = [imgObj];
            this.selectedObject = imgObj;
            if (isGif) {
                this.showToast('🎬 Animated GIF loaded with motion!');
            }
            window.soundManager.playPop();
            this.autoSave();
            this.render();
        };
        img.src = src;
    }

    // Hardware-Accelerated Dynamic GIF Motion Synchronizer
    updateGifOverlays() {
        const hasGifs = this.objects && this.objects.some(obj => obj && obj.type === 'image' && (obj.isGif || (obj.src && (obj.src.includes('.gif') || obj.src.startsWith('data:image/gif')))));
        if (!hasGifs) {
            if (this.gifLayer && this.gifLayer.children.length > 0) {
                this.gifLayer.innerHTML = '';
            }
            return;
        }

        if (!this.gifLayer) {
            this.gifLayer = document.getElementById('gif-animation-layer');
            if (!this.gifLayer) {
                this.gifLayer = document.createElement('div');
                this.gifLayer.id = 'gif-animation-layer';
                this.gifLayer.className = 'absolute inset-0 pointer-events-none overflow-hidden';
                this.gifLayer.style.zIndex = '5';
                const container = this.canvas.parentElement || document.getElementById('canvas-container');
                if (container) {
                    container.insertBefore(this.gifLayer, this.overlayCanvas || this.canvas.nextSibling);
                }
            }
        }
        if (!this.gifLayer) return;

        // Find all active animated GIF objects in the current slide
        const currentGifObjs = (this.objects || []).filter(obj => 
            obj && obj.type === 'image' && (obj.isGif || (obj.src && (obj.src.includes('.gif') || obj.src.startsWith('data:image/gif'))))
        );

        const activeIds = new Set();

        currentGifObjs.forEach(obj => {
            if (!obj.id) {
                obj.id = 'gif_' + Date.now() + '_' + Math.random().toString(36).substr(2, 6);
            }
            activeIds.add(obj.id);

            let imgEl = document.getElementById('dom-gif-' + obj.id);
            if (!imgEl) {
                imgEl = document.createElement('img');
                imgEl.id = 'dom-gif-' + obj.id;
                imgEl.src = obj.src;
                imgEl.setAttribute('data-src', obj.src);
                imgEl.style.position = 'absolute';
                imgEl.style.pointerEvents = 'none';
                imgEl.style.userSelect = 'none';
                imgEl.style.transformOrigin = '0 0';
                imgEl.style.imageRendering = 'auto';
                imgEl.style.willChange = 'transform, width, height';
                imgEl.setAttribute('draggable', 'false');
                this.gifLayer.appendChild(imgEl);
            }

            if (imgEl.getAttribute('data-src') !== obj.src) {
                imgEl.src = obj.src;
                imgEl.setAttribute('data-src', obj.src);
            }

            // Calculate precise screen/viewport pixel coordinates
            const sx = obj.x * this.scale + this.panX;
            const sy = obj.y * this.scale + this.panY;
            const sw = Math.max(10, (obj.width || 100) * this.scale);
            const sh = Math.max(10, (obj.height || 100) * this.scale);
            const rotDeg = Math.round((((obj.rotation || 0) * 180) / Math.PI) * 10) / 10;
            const scaleX = obj.flipH ? -1 : 1;
            const scaleY = obj.flipV ? -1 : 1;

            imgEl.style.left = '0px';
            imgEl.style.top = '0px';
            imgEl.style.width = `${sw}px`;
            imgEl.style.height = `${sh}px`;
            imgEl.style.transformOrigin = `${sw / 2}px ${sh / 2}px`;
            imgEl.style.transform = `translate3d(${sx}px, ${sy}px, 0) rotate(${rotDeg}deg) scale(${scaleX}, ${scaleY})`;
            imgEl.style.opacity = obj.opacity !== undefined ? obj.opacity : '1';
            imgEl.style.display = 'block';
        });

        // Clean up DOM elements for deleted or non-active slide GIFs
        const allDomGifs = this.gifLayer.querySelectorAll('img');
        allDomGifs.forEach(el => {
            const id = el.id.replace('dom-gif-', '');
            if (!activeIds.has(id)) {
                el.remove();
            }
        });
    }

    async onPaste(e) {
        if (['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) return;
        const clipboard = e.clipboardData || window.clipboardData;
        if (!clipboard) return;

        // 1. Check Image Blobs
        if (clipboard.items) {
            for (let item of clipboard.items) {
                if (item.type.indexOf('image') !== -1) {
                    const blob = item.getAsFile();
                    if (blob) {
                        const center = this.getViewCenter();
                        this.importImageFile(blob, center.x, center.y);
                        this.showToast('📋 Image / GIF pasted onto Whiteboard!');
                        return;
                    }
                }
            }
        }

        // 2. Check Pasted Text (Image URLs, SVG, or text)
        const text = clipboard.getData ? clipboard.getData('text') : null;
        if (text) {
            const cleanText = text.trim();
            // Check if it's an image or GIF URL
            if (/^https?:\/\/.+\.(png|jpe?g|gif|webp|svg)(\?.*)?$/i.test(cleanText) || /^data:image\//.test(cleanText)) {
                const center = this.getViewCenter();
                this.importImageFromUrl(cleanText, center.x, center.y);
                return;
            }

            // Normal text / equation paste
            this.addPastedTextSticky(cleanText);
        }
    }

    addPastedTextSticky(text) {
        const center = this.getViewCenter();
        const obj = {
            type: 'sticky',
            x: center.x - 120,
            y: center.y - 70,
            width: 240,
            height: 140,
            text: text,
            bgColor: '#ede9fe',
            textColor: '#4c1d95',
            fontSize: 13
        };
        this.addObject(obj);
        this.showToast('📋 Content pasted onto Whiteboard!');
        window.soundManager.playPop();
    }

    // --- State Persistence & Auto-Save across Refresh ---
    autoSave() {
        if (this._saveTimeout) clearTimeout(this._saveTimeout);
        this._saveTimeout = setTimeout(() => {
            try {
                const state = {
                    version: 2,
                    slides: this.slides.map(s => ({
                        id: s.id,
                        title: s.title,
                        bgColor: s.bgColor,
                        objects: s.objects.map(obj => {
                            const clean = { ...obj };
                            delete clean.img;
                            delete clean._loading;
                            return clean;
                        })
                    })),
                    currentSlideIndex: this.currentSlideIndex,
                    theme: this.theme,
                    customBgColor: this.customBgColor,
                    showGrid: this.showGrid,
                    timestamp: Date.now()
                };
                localStorage.setItem('interactive_whiteboard_autosave_v2', JSON.stringify(state));
                localStorage.removeItem('whiteboard_cleared_by_user');
            } catch (err) {
                console.warn('Auto-save warning (e.g. storage quota for very large images):', err);
            }
        }, 250);
    }

    loadAutoSavedState() {
        try {
            const raw = localStorage.getItem('interactive_whiteboard_autosave_v2');
            if (!raw) return false;
            const state = JSON.parse(raw);
            if (state && Array.isArray(state.slides) && state.slides.length > 0) {
                this.slides = state.slides.map(s => ({
                    id: s.id || 1,
                    title: s.title || 'Slide 1',
                    bgColor: s.bgColor,
                    objects: (s.objects || []).map(obj => {
                        if (obj.type === 'image' && obj.src) {
                            if (obj.isGif === undefined) {
                                obj.isGif = this.isGifFormat(obj.src);
                            }
                            const img = new Image();
                            img.crossOrigin = 'anonymous';
                            img.onload = () => { obj.img = img; this.render(); };
                            img.src = obj.src;
                        }
                        return obj;
                    }),
                    undoStack: [],
                    redoStack: []
                }));
                this.currentSlideIndex = (state.currentSlideIndex >= 0 && state.currentSlideIndex < this.slides.length)
                    ? state.currentSlideIndex
                    : 0;
                if (state.theme) this.theme = state.theme;
                if (state.customBgColor) this.customBgColor = state.customBgColor;
                if (state.showGrid !== undefined) this.showGrid = state.showGrid;
                return true;
            }
        } catch (e) {
            console.error('Error loading autosave state:', e);
        }
        return false;
    }

    // --- Smart Shape Recognition Engine ---
    recognizeShape(pts) {
        if (pts.length < 8) return null;
        const first = pts[0];
        const last = pts[pts.length - 1];
        const distClosed = Math.hypot(last.x - first.x, last.y - first.y);

        let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
        pts.forEach(p => {
            minX = Math.min(minX, p.x);
            maxX = Math.max(maxX, p.x);
            minY = Math.min(minY, p.y);
            maxY = Math.max(maxY, p.y);
        });
        const w = maxX - minX;
        const h = maxY - minY;
        const diag = Math.hypot(w, h);

        if (distClosed > diag * 0.75) {
            return {
                type: 'line',
                x1: first.x,
                y1: first.y,
                x2: last.x,
                y2: last.y
            };
        }

        if (distClosed < diag * 0.3) {
            const aspect = w / h;
            const cx = minX + w / 2;
            const cy = minY + h / 2;

            let avgRadDev = 0;
            const rx = w / 2;
            const ry = h / 2;
            pts.forEach(p => {
                const normX = (p.x - cx) / rx;
                const normY = (p.y - cy) / ry;
                const rad = Math.hypot(normX, normY);
                avgRadDev += Math.abs(rad - 1.0);
            });
            avgRadDev /= pts.length;

            if (avgRadDev < 0.22) {
                if (Math.abs(aspect - 1) < 0.25) {
                    const r = (w + h) / 4;
                    return { type: 'ellipse', x: cx, y: cy, radiusX: r, radiusY: r };
                } else {
                    return { type: 'ellipse', x: cx, y: cy, radiusX: rx, radiusY: ry };
                }
            }

            if (aspect > 0.3 && aspect < 3.0) {
                return {
                    type: 'rectangle',
                    x: minX,
                    y: minY,
                    width: w,
                    height: h,
                    rounded: true
                };
            }
        }
        return null;
    }

    isValidStroke(s) {
        if (s.type === 'freehand') return s.points && s.points.length > 1;
        if (['rect', 'ellipse', 'triangle', 'diamond', 'star'].includes(s.type)) {
            return Math.abs(s.width) > 4 || Math.abs(s.height) > 4;
        }
        if (['line', 'arrow'].includes(s.type)) {
            return Math.hypot(s.x2 - s.x1, s.y2 - s.y1) > 4;
        }
        return true;
    }

    eraseAt(worldX, worldY) {
        const eraseRadius = 25 / this.scale;
        const initialLen = this.objects.length;

        this.currentSlide.objects = this.objects.filter(obj => {
            if (obj.points) {
                return !obj.points.some(p => Math.hypot(p.x - worldX, p.y - worldY) < eraseRadius);
            }
            return !this.isPointInObject(worldX, worldY, obj);
        });

        if (this.objects.length < initialLen) {
            window.soundManager.playErase();
            this.render();
        }
    }

    isPointInObject(x, y, obj) {
        if (!obj) return false;
        let testX = x;
        let testY = y;
        if (obj.rotation) {
            let cx = 0, cy = 0;
            if (obj.x !== undefined && obj.width !== undefined) {
                cx = obj.x + (obj.width || 0) / 2;
                cy = obj.y + (obj.height || 0) / 2;
            } else if (obj.x1 !== undefined && obj.x2 !== undefined) {
                cx = (obj.x1 + obj.x2) / 2;
                cy = (obj.y1 + obj.y2) / 2;
            } else if (obj.points && obj.points.length > 0) {
                const b = this.getObjectBounds(obj);
                if (b) { cx = (b.minX + b.maxX) / 2; cy = (b.minY + b.maxY) / 2; }
            }
            const cos = Math.cos(-obj.rotation);
            const sin = Math.sin(-obj.rotation);
            testX = cx + (x - cx) * cos - (y - cy) * sin;
            testY = cy + (x - cx) * sin + (y - cy) * cos;
        }

        if (obj.points && obj.points.length > 0) {
            const hitThresh = 14 / this.scale;
            return obj.points.some(p => Math.hypot(p.x - testX, p.y - testY) <= hitThresh);
        }
        if (['rectangle', 'rect', 'square', 'sticky', 'image', 'quiz', 'latex', 'element', 'diamond', 'star', 'triangle', 'lens'].includes(obj.type)) {
            const rx = obj.width >= 0 ? obj.x : obj.x + obj.width;
            const ry = obj.height >= 0 ? obj.y : obj.y + obj.height;
            const rw = Math.abs(obj.width || 0);
            const rh = Math.abs(obj.height || 0);
            if (testX >= rx && testX <= rx + rw && testY >= ry && testY <= ry + rh) return true;
            if (obj.type === 'lens' && obj._cardBounds) {
                const cb = obj._cardBounds;
                if (testX >= cb.x && testX <= cb.x + cb.w && testY >= cb.y && testY <= cb.y + cb.h) return true;
            }
            return false;
        }
        if (obj.type === 'ellipse' || obj.type === 'circle') {
            const rx = obj.radiusX || Math.abs(obj.width || 1) / 2 || 1;
            const ry = obj.radiusY || Math.abs(obj.height || 1) / 2 || 1;
            const cx = obj.radiusX ? obj.x : obj.x + (obj.width || 0) / 2;
            const cy = obj.radiusY ? obj.y : obj.y + (obj.height || 0) / 2;
            const dx = (testX - cx) / rx;
            const dy = (testY - cy) / ry;
            return (dx * dx + dy * dy) <= 1.2;
        }
        if (obj.type === 'text') {
            const b = this.getObjectBounds(obj);
            if (b) {
                return testX >= b.minX - 8 && testX <= b.maxX + 8 && testY >= b.minY - 8 && testY <= b.maxY + 8;
            }
            return testX >= obj.x && testX <= obj.x + 220 && testY >= obj.y - (obj.fontSize || 20) && testY <= obj.y + 40;
        }
        if (obj.x1 !== undefined && obj.x2 !== undefined) {
            const lineDist = this.distToSegment({ x: testX, y: testY }, { x: obj.x1, y: obj.y1 }, { x: obj.x2, y: obj.y2 });
            return lineDist < 12 / this.scale;
        }
        return false;
    }

    distToSegment(p, v, w) {
        const l2 = (w.x - v.x) ** 2 + (w.y - v.y) ** 2;
        if (l2 === 0) return Math.hypot(p.x - v.x, p.y - v.y);
        let t = ((p.x - v.x) * (w.x - v.x) + (p.y - v.y) * (w.y - v.y)) / l2;
        t = Math.max(0, Math.min(1, t));
        return Math.hypot(p.x - (v.x + t * (w.x - v.x)), p.y - (v.y + t * (w.y - v.y)));
    }

    findObjectAt(worldX, worldY) {
        for (let i = this.objects.length - 1; i >= 0; i--) {
            if (this.isPointInObject(worldX, worldY, this.objects[i])) {
                return this.objects[i];
            }
        }
        return null;
    }

    handleLensInteraction(wx, wy, lensObj) {
        if (!lensObj._actionButtons) return false;
        for (let btn of lensObj._actionButtons) {
            if (wx >= btn.x && wx <= btn.x + btn.w && wy >= btn.y && wy <= btn.y + btn.h) {
                if (btn.action === 'plot_graph') {
                    const formula = lensObj.result?.formula || 'sin(x)';
                    if (window.widgets) {
                        window.widgets.plotFunctionToCanvas(formula, -10, 10, 0.08, lensObj.result?.title || 'Lens Formula');
                    }
                    this.showToast('📈 Mathematical function graph plotted to whiteboard!');
                    window.soundManager.playPop();
                } else if (btn.action === 'insert_chem') {
                    if (window.widgets) {
                        window.widgets.plotChemistryTitration();
                    }
                    this.showToast('🧪 Chemistry reaction / titration graph placed on whiteboard!');
                    window.soundManager.playPop();
                } else if (btn.action === 'insert_bio') {
                    if (window.widgets) {
                        window.widgets.plotBiologyGrowthCurve('logistic');
                    }
                    this.showToast('🧬 Biology growth model graph placed on whiteboard!');
                    window.soundManager.playPop();
                } else if (btn.action === 'open_diagram') {
                    const d = lensObj.result?.diagram;
                    if (d && (d.pageUrl || d.url)) {
                        window.open(d.pageUrl || d.url, '_blank');
                        this.showToast('🔗 Diagram opened! Right-click "Copy Image", then press CTRL+V here to paste.');
                    }
                } else if (btn.action === 'ask_question') {
                    const q = prompt('💬 Ask AI any question about this selected area (e.g. solve step 2, explain formula, simplify):', lensObj.query || '');
                    if (q !== null && q.trim()) {
                        lensObj.query = q.trim();
                        this.triggerLensScan(lensObj, q.trim());
                    }
                } else if (btn.action === 'insert_solution') {
                    if (window.widgets && lensObj.result) {
                        window.widgets.insertAIToCanvas(lensObj.result);
                        this.showToast('✨ Solution card placed on whiteboard!');
                    }
                } else if (btn.action === 'rescan') {
                    this.triggerLensScan(lensObj, lensObj.query || '');
                    this.showToast('🔄 Scanning updated area with Google Lens AI...');
                } else if (btn.action === 'close') {
                    const idx = this.objects.indexOf(lensObj);
                    if (idx >= 0) {
                        this.saveUndoState();
                        this.objects.splice(idx, 1);
                        this.selectedObjects = [];
                        this.selectedObject = null;
                        this.render();
                        this.autoSave();
                        window.soundManager.playPop();
                    }
                }
                return true;
            }
        }
        return false;
    }

    debounceLensScan(lensObj) {
        if (!this._lensDebounceTimers) this._lensDebounceTimers = new Map();
        if (this._lensDebounceTimers.has(lensObj)) {
            clearTimeout(this._lensDebounceTimers.get(lensObj));
        }
        const t = setTimeout(() => {
            this.triggerLensScan(lensObj, lensObj.query || '');
        }, 500);
        this._lensDebounceTimers.set(lensObj, t);
    }

    async triggerLensScan(lensObj, customQuestion = '') {
        if (!window.widgets) return;
        lensObj.isScanning = true;
        this.render();

        const enclosed = this.getObjectsInArea(lensObj.x, lensObj.y, lensObj.width, lensObj.height);
        try {
            const res = await window.widgets.analyzeLensArea(lensObj, enclosed, customQuestion);
            lensObj.result = res;
        } catch (err) {
            console.warn('Lens scan error:', err);
        } finally {
            lensObj.isScanning = false;
            this.render();
            this.autoSave();
        }
    }

    getObjectsInArea(x, y, w, h) {
        const rx = w >= 0 ? x : x + w;
        const ry = h >= 0 ? y : y + h;
        const rw = Math.abs(w);
        const rh = Math.abs(h);
        const pad = 6;

        return this.objects.filter(obj => {
            if (!obj || obj.type === 'lens') return false;
            const b = this.getObjectBounds(obj);
            if (!b) return false;
            return !(b.maxX < rx - pad || b.minX > rx + rw + pad || b.maxY < ry - pad || b.minY > ry + rh + pad);
        });
    }

    showToast(msg) {
        const existing = document.getElementById('app-toast');
        if (existing) existing.remove();

        const toast = document.createElement('div');
        toast.id = 'app-toast';
        toast.className = 'fixed top-20 right-6 z-50 flex items-center gap-2.5 px-4 py-3 bg-slate-900/90 dark:bg-white/95 text-white dark:text-slate-900 backdrop-blur-md rounded-2xl shadow-2xl border border-slate-700/50 dark:border-slate-200/50 text-xs font-bold animate-in fade-in slide-in-from-top-4 duration-300';
        toast.innerHTML = `
            <i class="fa-solid fa-circle-check text-emerald-400 dark:text-emerald-600 text-sm"></i>
            <span>${msg}</span>
        `;
        document.body.appendChild(toast);

        setTimeout(() => {
            toast.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
            toast.style.opacity = '0';
            toast.style.transform = 'translateY(-10px)';
            setTimeout(() => toast.remove(), 400);
        }, 3000);
    }

    async pasteFromClipboard() {
        try {
            if (navigator.clipboard && navigator.clipboard.read) {
                const items = await navigator.clipboard.read();
                for (let item of items) {
                    for (let type of item.types) {
                        if (type.startsWith('image/')) {
                            const blob = await item.getType(type);
                            const center = this.getViewCenter();
                            this.importImageFile(blob, center.x, center.y);
                            this.showToast('📋 Image pasted onto Whiteboard!');
                            return;
                        }
                    }
                }
            }
            if (navigator.clipboard && navigator.clipboard.readText) {
                const text = await navigator.clipboard.readText();
                if (text) {
                    this.onPaste({ clipboardData: { getData: () => text, items: [] } });
                }
            }
        } catch (err) {
            alert('To paste diagram: Please copy the image and press CTRL+V on your keyboard.');
        }
    }

    handleQuizInteraction(wx, wy, quiz) {
        const optionH = 30;
        const optionGap = 6;
        
        // Calculate qLines count
        const maxQW = Math.max(50, quiz.width - 32);
        const words = (quiz.question || '').split(' ');
        let curLine = '';
        let lineCount = 0;
        this.ctx.font = `bold 13px ${this.fontFamily}`;
        for (let n = 0; n < words.length; n++) {
            const testLine = curLine ? `${curLine} ${words[n]}` : words[n];
            if (this.ctx.measureText(testLine).width > maxQW && n > 0) {
                lineCount++;
                curLine = words[n];
            } else {
                curLine = testLine;
            }
        }
        if (curLine) lineCount++;
        lineCount = Math.min(3, Math.max(1, lineCount));
        
        const qY = quiz.y + 42 + (lineCount - 1) * 17;
        const startY = Math.max(qY + 6, quiz.y + 72);

        quiz.options.forEach((opt, idx) => {
            const optY = startY + idx * (optionH + optionGap);
            if (wx >= quiz.x + 16 && wx <= quiz.x + quiz.width - 16 && wy >= optY && wy <= optY + optionH) {
                quiz.selectedIndex = idx;
                quiz.isAnswered = true;
                if (idx === quiz.correctIndex) {
                    window.soundManager.playChime();
                    if (window.confetti) {
                        window.confetti({ particleCount: 80, spread: 60, origin: { y: 0.6 } });
                    }
                } else {
                    window.soundManager.playPop();
                }
                this.render();
                this.autoSave();
            }
        });
    }

    addObject(obj) {
        this.saveUndoState();
        this.objects.push(obj);
        this.render();
        this.autoSave();
    }

    rotateSelected(deltaRad = Math.PI / 2) {
        if (!this.selectedObjects || this.selectedObjects.length === 0) {
            if (this.selectedObject) {
                this.selectedObjects = [this.selectedObject];
            } else {
                this.showToast('Select an image, gif or shape to rotate');
                return;
            }
        }
        this.saveUndoState();
        this.selectedObjects.forEach(obj => {
            const curRot = obj.rotation || 0;
            obj.rotation = (curRot + deltaRad) % (Math.PI * 2);
        });
        this.render();
        this.autoSave();
        if (window.soundManager && typeof window.soundManager.playPop === 'function') {
            window.soundManager.playPop();
        }
        const deg = Math.round((((this.selectedObjects[0].rotation || 0) * 180 / Math.PI) % 360 + 360) % 360);
        this.showToast(`↻ Rotated to ${deg}°`);
    }

    flipSelected(axis = 'h') {
        if (!this.selectedObjects || this.selectedObjects.length === 0) {
            if (this.selectedObject) {
                this.selectedObjects = [this.selectedObject];
            } else {
                return;
            }
        }
        this.saveUndoState();
        this.selectedObjects.forEach(obj => {
            if (axis === 'h') {
                obj.flipH = !obj.flipH;
            } else {
                obj.flipV = !obj.flipV;
            }
        });
        this.render();
        this.autoSave();
        if (window.soundManager && typeof window.soundManager.playPop === 'function') {
            window.soundManager.playPop();
        }
        this.showToast(axis === 'h' ? '↔ Flipped horizontally' : '↕ Flipped vertically');
    }

    resetSelectedRotation() {
        if (!this.selectedObjects || this.selectedObjects.length === 0) {
            if (this.selectedObject) {
                this.selectedObjects = [this.selectedObject];
            } else {
                return;
            }
        }
        this.saveUndoState();
        this.selectedObjects.forEach(obj => {
            obj.rotation = 0;
            obj.flipH = false;
            obj.flipV = false;
        });
        this.render();
        this.autoSave();
        this.showToast('Rotation reset to 0°');
    }

    deleteSelected() {
        if (!this.selectedObjects || this.selectedObjects.length === 0) {
            if (!this.selectedObject) {
                this.showToast('💡 Select a text box, note, or object first to delete');
                return;
            }
            this.selectedObjects = [this.selectedObject];
        }
        this.saveUndoState();
        const set = new Set(this.selectedObjects);
        this.currentSlide.objects = this.objects.filter(o => !set.has(o));
        const count = this.selectedObjects.length;
        this.selectedObjects = [];
        this.selectedObject = null;
        if (window.soundManager) window.soundManager.playErase();
        if (window.syncObjectProperties) window.syncObjectProperties(null);
        this.render();
        this.autoSave();
        this.showToast(count > 1 ? `🗑️ Deleted ${count} items` : '🗑️ Deleted selected box');
    }

    copyFormat() {
        const obj = this.selectedObject || (this.selectedObjects && this.selectedObjects[0]);
        if (!obj) {
            this.showToast('💡 Select a text box, note, or shape first to copy its style');
            return;
        }

        const isAITutor = !!(
            obj.isAITutor ||
            (typeof obj.text === 'string' && (
                obj.text.includes('AI Tutor') || 
                obj.text.includes('Study Tip') || 
                obj.text.includes('Key Takeaway') || 
                obj.text.includes('Conceptual Breakdown') ||
                obj.text.includes('Photoelectric Effect')
            ))
        );

        this.copiedFormat = {
            sourceType: obj.type,
            isAITutor: isAITutor,
            fontColor: obj.fontColor || obj.textColor || obj.strokeColor,
            textColor: obj.textColor || obj.fontColor || obj.strokeColor,
            strokeColor: obj.strokeColor || obj.textColor || obj.fontColor,
            fillColor: obj.fillColor || obj.bgColor,
            bgColor: obj.bgColor || obj.fillColor,
            fontSize: obj.fontSize !== undefined ? obj.fontSize : (obj.type === 'sticky' ? 13 : 20),
            fontWeight: obj.fontWeight || 'normal',
            fontFamily: obj.fontFamily || this.fontFamily,
            lineHeight: obj.lineHeight !== undefined ? obj.lineHeight : (obj.type === 'sticky' ? 1.45 : 1.4),
            strikethrough: !!obj.strikethrough,
            strokeWidth: obj.strokeWidth !== undefined ? obj.strokeWidth : 1.5,
            rounded: obj.rounded !== undefined ? obj.rounded : true,
            borderRadius: obj.borderRadius !== undefined ? obj.borderRadius : 10,
            width: obj.width,
            height: obj.height,
            isCard: ['sticky', 'quiz', 'element', 'latex'].includes(obj.type)
        };

        this.formatPainterActive = true;
        const styleName = isAITutor ? '🤖 AI Tutor' : '🖌️';
        this.showToast(`${styleName} format style copied! Click on any box/note or press Ctrl+Shift+V to apply`);
        if (window.soundManager) window.soundManager.playPop();
        const btn = document.getElementById('btn-format-painter');
        if (btn) {
            btn.classList.add('bg-indigo-100', 'dark:bg-indigo-900/50', 'text-indigo-600', 'font-bold', 'ring-2', 'ring-indigo-400');
        }
    }

    pasteFormat(target = null) {
        if (!this.copiedFormat) {
            this.showToast('💡 Copy a style first (Ctrl+Shift+C or 🖌️ button)');
            return;
        }
        const targets = target ? [target] : ((this.selectedObjects && this.selectedObjects.length > 0) ? this.selectedObjects : (this.selectedObject ? [this.selectedObject] : []));
        if (targets.length === 0) {
            this.showToast('💡 Select target text, note, or shape to paste style onto');
            return;
        }
        this.saveUndoState();
        const fmt = this.copiedFormat;

        targets.forEach(t => {
            if (t.type === 'text') {
                t.fontSize = fmt.fontSize;
                t.fontWeight = fmt.fontWeight;
                t.strikethrough = fmt.strikethrough;
                if (fmt.lineHeight) t.lineHeight = fmt.lineHeight;
                if (fmt.fontFamily) t.fontFamily = fmt.fontFamily;
                
                const chosenColor = fmt.textColor || fmt.fontColor || fmt.strokeColor;
                if (chosenColor) {
                    t.fontColor = chosenColor;
                    t.textColor = chosenColor;
                    t.strokeColor = chosenColor;
                }
                
                // If format came from AI Tutor or sticky note, apply the AI Tutor card background & properties
                if (fmt.isAITutor || fmt.sourceType === 'sticky' || fmt.bgColor) {
                    t.bgColor = fmt.bgColor || (fmt.isAITutor ? '#ede9fe' : 'transparent');
                    if (fmt.isAITutor) {
                        t.isAITutor = true;
                    }
                }
            } else if (t.type === 'sticky') {
                t.bgColor = fmt.bgColor || fmt.fillColor || (fmt.isAITutor ? '#ede9fe' : '#fef08a');
                t.textColor = fmt.textColor || fmt.fontColor || (fmt.isAITutor ? '#4c1d95' : '#1e293b');
                if (fmt.fontSize) t.fontSize = fmt.fontSize;
                if (fmt.fontWeight) t.fontWeight = fmt.fontWeight;
                if (fmt.lineHeight) t.lineHeight = fmt.lineHeight;
                if (fmt.fontFamily) t.fontFamily = fmt.fontFamily;
                if (fmt.strikethrough !== undefined) t.strikethrough = fmt.strikethrough;
                if (fmt.isAITutor) t.isAITutor = true;
            } else if (['quiz', 'element', 'latex', 'table'].includes(t.type)) {
                if (fmt.bgColor || fmt.fillColor) t.bgColor = fmt.bgColor || fmt.fillColor;
                if (fmt.textColor || fmt.fontColor) {
                    t.textColor = fmt.textColor || fmt.fontColor;
                    t.fontColor = fmt.textColor || fmt.fontColor;
                }
                if (fmt.fontSize) t.fontSize = fmt.fontSize;
                if (fmt.isAITutor) t.isAITutor = true;
            } else if (['rectangle', 'rect', 'square', 'ellipse', 'circle', 'triangle', 'diamond', 'star'].includes(t.type)) {
                if (fmt.bgColor || fmt.fillColor) {
                    t.fillColor = fmt.bgColor || fmt.fillColor;
                }
                if (fmt.strokeColor || fmt.textColor || fmt.fontColor) {
                    t.strokeColor = fmt.strokeColor || fmt.textColor || fmt.fontColor;
                }
                if (fmt.strokeWidth !== undefined) t.strokeWidth = fmt.strokeWidth;
                if (fmt.rounded !== undefined) t.rounded = fmt.rounded;
            } else if (['line', 'arrow', 'curve', 'curve-arrow', 'freehand'].includes(t.type)) {
                if (fmt.strokeColor || fmt.fontColor || fmt.textColor) {
                    t.strokeColor = fmt.strokeColor || fmt.fontColor || fmt.textColor;
                }
                if (fmt.strokeWidth !== undefined) t.strokeWidth = fmt.strokeWidth;
            }
        });

        this.render();
        this.autoSave();
        if (window.syncObjectProperties) {
            window.syncObjectProperties(targets[0]);
        }
        this.showToast('✨ Format style & editing behavior applied!');
        if (window.soundManager) window.soundManager.playChime();
        this.formatPainterActive = false;
        const btn = document.getElementById('btn-format-painter');
        if (btn) {
            btn.classList.remove('bg-indigo-100', 'dark:bg-indigo-900/50', 'text-indigo-600', 'font-bold', 'ring-2', 'ring-indigo-400');
        }
    }

    copySelected() {
        const targets = (this.selectedObjects && this.selectedObjects.length > 0)
            ? this.selectedObjects
            : (this.selectedObject ? [this.selectedObject] : []);

        if (!targets || targets.length === 0) {
            this.showToast('ℹ️ Select an object, text box, or diagram first to copy');
            return false;
        }

        this.copiedObjects = JSON.parse(JSON.stringify(targets));

        // Also copy plain text if selecting text/sticky notes
        const textItem = targets.find(t => t.text);
        if (textItem && navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(textItem.text).catch(() => {});
        }

        if (window.soundManager && typeof window.soundManager.playPop === 'function') {
            window.soundManager.playPop();
        }

        this.showToast(`📋 Copied ${targets.length} selected item${targets.length > 1 ? 's' : ''}`);
        return true;
    }

    async pasteCopiedOrClipboard() {
        if (this.copiedObjects && this.copiedObjects.length > 0) {
            this.saveUndoState();
            const clones = JSON.parse(JSON.stringify(this.copiedObjects));
            const offset = 24;

            clones.forEach(clone => {
                clone.id = Date.now() + Math.random();
                if (clone.points && Array.isArray(clone.points)) {
                    clone.points = clone.points.map(p => ({
                        ...p,
                        x: p.x + offset,
                        y: p.y + offset
                    }));
                } else if (clone.x1 !== undefined && clone.y1 !== undefined) {
                    clone.x1 += offset;
                    clone.y1 += offset;
                    clone.x2 += offset;
                    clone.y2 += offset;
                    if (clone.cx !== undefined) {
                        clone.cx += offset;
                        clone.cy += offset;
                    }
                } else if (clone.x !== undefined && clone.y !== undefined) {
                    clone.x += offset;
                    clone.y += offset;
                }
                this.objects.push(clone);
            });

            this.selectedObjects = clones;
            this.selectedObject = clones[0] || null;

            if (window.soundManager && typeof window.soundManager.playPop === 'function') {
                window.soundManager.playPop();
            }

            this.render();
            this.autoSave();
            this.showToast(`📋 Pasted ${clones.length} item${clones.length > 1 ? 's' : ''}`);
            return;
        }

        // If no internal copied objects, paste from system clipboard
        await this.pasteFromClipboard();
    }

    duplicateSelected() {
        const targets = (this.selectedObjects && this.selectedObjects.length > 0)
            ? this.selectedObjects
            : (this.selectedObject ? [this.selectedObject] : []);

        if (!targets || targets.length === 0) {
            this.showToast('ℹ️ Select an object or region on canvas to duplicate');
            return;
        }

        this.saveUndoState();
        const clones = [];
        const offset = 24;

        targets.forEach(item => {
            const clone = JSON.parse(JSON.stringify(item));
            clone.id = Date.now() + Math.random();

            if (clone.points && Array.isArray(clone.points)) {
                clone.points = clone.points.map(p => ({
                    ...p,
                    x: p.x + offset,
                    y: p.y + offset
                }));
            }
            if (clone.x1 !== undefined && clone.y1 !== undefined) {
                clone.x1 += offset;
                clone.y1 += offset;
                clone.x2 += offset;
                clone.y2 += offset;
                if (clone.cx !== undefined) {
                    clone.cx += offset;
                    clone.cy += offset;
                }
            }
            if (clone.x !== undefined && clone.y !== undefined) {
                clone.x += offset;
                clone.y += offset;
            }

            this.objects.push(clone);
            clones.push(clone);
        });

        this.selectedObjects = clones;
        this.selectedObject = clones[0] || null;

        if (window.soundManager && typeof window.soundManager.playPop === 'function') {
            window.soundManager.playPop();
        }

        this.render();
        this.autoSave();
        this.showToast(`📋 Duplicated ${clones.length} selected item${clones.length > 1 ? 's' : ''}`);
    }

    toggleBulletList(target = null) {
        const obj = target || this.selectedObject;
        if (!obj || (!obj.text && obj.type !== 'text' && obj.type !== 'sticky')) {
            this.showToast('💡 Select a text box or sticky note to toggle bullets');
            return;
        }
        this.saveUndoState();
        const rawText = obj.text || '';
        const lines = rawText.split('\n');
        const allBulleted = lines.every(l => !l.trim() || l.trim().startsWith('• ') || l.trim().startsWith('- '));

        const newLines = lines.map(l => {
            if (!l.trim()) return l;
            if (allBulleted) {
                return l.replace(/^\s*(•|-|\*)\s*/, '');
            } else {
                const clean = l.replace(/^\s*(\d+\.|•|-|\*)\s*/, '');
                return `• ${clean}`;
            }
        });
        obj.text = newLines.join('\n');
        this.render();
        this.autoSave();
        if (window.soundManager) window.soundManager.playPop();
        this.showToast(allBulleted ? '• Bullet points removed' : '• Bullet points added');
    }

    toggleNumberedList(target = null) {
        const obj = target || this.selectedObject;
        if (!obj || (!obj.text && obj.type !== 'text' && obj.type !== 'sticky')) {
            this.showToast('💡 Select a text box or sticky note to toggle numbers');
            return;
        }
        this.saveUndoState();
        const rawText = obj.text || '';
        const lines = rawText.split('\n');
        const allNumbered = lines.every(l => !l.trim() || /^\s*\d+\.\s*/.test(l));

        let numCounter = 1;
        const newLines = lines.map(l => {
            if (!l.trim()) return l;
            if (allNumbered) {
                return l.replace(/^\s*\d+\.\s*/, '');
            } else {
                const clean = l.replace(/^\s*(\d+\.|•|-|\*)\s*/, '');
                return `${numCounter++}. ${clean}`;
            }
        });
        obj.text = newLines.join('\n');
        this.render();
        this.autoSave();
        if (window.soundManager) window.soundManager.playPop();
        this.showToast(allNumbered ? '1. Numbered list removed' : '1. Numbered list added');
    }

    changeFontSize(delta) {
        const targets = (this.selectedObjects && this.selectedObjects.length > 0) ? this.selectedObjects : (this.selectedObject ? [this.selectedObject] : []);
        this.saveUndoState();
        if (targets.length > 0) {
            targets.forEach(obj => {
                if (obj.type === 'text' || obj.type === 'sticky') {
                    const cur = obj.fontSize || 20;
                    obj.fontSize = Math.min(84, Math.max(10, cur + delta));
                }
            });
            const mainObj = targets[0];
            const newSize = mainObj.fontSize || 20;
            this.fontSize = newSize;
            const disp = document.getElementById('toolbar-font-size-display');
            if (disp) disp.textContent = `${newSize}px`;
            const edDisp = document.getElementById('editor-font-display');
            if (edDisp) edDisp.textContent = `${newSize}px`;
        } else {
            this.fontSize = Math.min(84, Math.max(10, (this.fontSize || 20) + delta));
            const disp = document.getElementById('toolbar-font-size-display');
            if (disp) disp.textContent = `${this.fontSize}px`;
            const edDisp = document.getElementById('editor-font-display');
            if (edDisp) edDisp.textContent = `${this.fontSize}px`;
        }
        this.render();
        this.autoSave();
        if (window.soundManager) window.soundManager.playClick();
    }

    saveUndoState() {
        this.currentSlide.undoStack.push(JSON.stringify(this.objects));
        if (this.currentSlide.undoStack.length > 40) this.currentSlide.undoStack.shift();
        this.currentSlide.redoStack = [];
    }

    onKeyDown(e) {
        if (['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) return;

        if (e.ctrlKey || e.metaKey) {
            const k = e.key.toLowerCase();
            if (e.shiftKey && k === 'c') {
                e.preventDefault();
                this.copyFormat();
                return;
            } else if (e.shiftKey && k === 'v') {
                e.preventDefault();
                this.pasteFormat();
                return;
            } else if (k === 'b' && this.selectedObject) {
                e.preventDefault();
                this.saveUndoState();
                const isBold = this.selectedObject.fontWeight === 'bold';
                this.selectedObject.fontWeight = isBold ? 'normal' : 'bold';
                this.render();
                this.autoSave();
                if (window.syncObjectProperties) window.syncObjectProperties(this.selectedObject);
                return;
            } else if (k === 'z') {
                e.preventDefault();
                if (e.shiftKey) {
                    this.redo();
                } else {
                    this.undo();
                }
            } else if (k === 'y') {
                e.preventDefault();
                this.redo();
            } else if (k === 'a') {
                e.preventDefault();
                this.selectedObjects = [...this.objects];
                this.selectedObject = this.selectedObjects[0] || null;
                this.render();
            } else if (k === 'd') {
                e.preventDefault();
                this.duplicateSelected();
                return;
            } else if (k === 'c' && this.selectedObjects && this.selectedObjects.length > 0) {
                this.copiedObjects = JSON.parse(JSON.stringify(this.selectedObjects));
            } else if (k === 'x' && this.selectedObjects && this.selectedObjects.length > 0) {
                e.preventDefault();
                this.copiedObjects = JSON.parse(JSON.stringify(this.selectedObjects));
                this.deleteSelected();
                this.showToast('✂️ Cut selected item(s) to clipboard!');
            } else if (k === 'v' && this.copiedObjects && this.copiedObjects.length > 0) {
                this.saveUndoState();
                const clones = JSON.parse(JSON.stringify(this.copiedObjects));
                clones.forEach(clone => {
                    if (clone.points) {
                        clone.points.forEach(p => { p.x += 30; p.y += 30; });
                    } else if (clone.x1 !== undefined) {
                        clone.x1 += 30; clone.y1 += 30;
                        clone.x2 += 30; clone.y2 += 30;
                        if (clone.cx !== undefined) { clone.cx += 30; clone.cy += 30; }
                    } else {
                        clone.x = (clone.x || 0) + 30;
                        clone.y = (clone.y || 0) + 30;
                    }
                    this.objects.push(clone);
                });
                this.selectedObjects = clones;
                this.selectedObject = clones[0] || null;
                window.soundManager.playPop();
                this.render();
            }
        } else if (e.key === 'Enter') {
            const sel = this.selectedObject || (this.selectedObjects && this.selectedObjects.length === 1 ? this.selectedObjects[0] : null);
            if (sel && this.isEditableObject(sel)) {
                e.preventDefault();
                this.editObjectInline(sel, sel.x, sel.y);
                return;
            }
        } else if (e.key === 'Delete' || e.key === 'Backspace') {
            if (this.selectedObjects && this.selectedObjects.length > 0) {
                this.deleteSelected();
            }
        } else if (e.key === 'Escape') {
            this.selectedObjects = [];
            this.selectedObject = null;
            this.render();
        } else if (e.altKey && (e.key === 'ArrowLeft' || e.key === 'ArrowRight')) {
            e.preventDefault();
            if (e.key === 'ArrowLeft') {
                this.moveCurrentSlideLeft();
            } else {
                this.moveCurrentSlideRight();
            }
        } else if (['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(e.key) && this.selectedObjects && this.selectedObjects.length > 0) {
            e.preventDefault();
            this.saveUndoState();
            const step = e.shiftKey ? 20 : 5;
            let dx = 0, dy = 0;
            if (e.key === 'ArrowLeft') dx = -step;
            if (e.key === 'ArrowRight') dx = step;
            if (e.key === 'ArrowUp') dy = -step;
            if (e.key === 'ArrowDown') dy = step;

            this.selectedObjects.forEach(obj => {
                if (obj.points) {
                    obj.points.forEach(p => { p.x += dx; p.y += dy; });
                } else if (obj.x1 !== undefined) {
                    obj.x1 += dx; obj.y1 += dy;
                    obj.x2 += dx; obj.y2 += dy;
                    if (obj.cx !== undefined) { obj.cx += dx; obj.cy += dy; }
                } else {
                    if (obj.x !== undefined) obj.x += dx;
                    if (obj.y !== undefined) obj.y += dy;
                }
            });
            this.render();
        }
    }

    undo() {
        if (this.currentSlide.undoStack.length > 0) {
            this.currentSlide.redoStack.push(JSON.stringify(this.objects));
            const prev = this.currentSlide.undoStack.pop();
            this.currentSlide.objects = JSON.parse(prev);
            this.selectedObjects = [];
            this.selectedObject = null;
            window.soundManager.playClick();
            this.render();
            this.autoSave();
        }
    }

    redo() {
        if (this.currentSlide.redoStack.length > 0) {
            this.currentSlide.undoStack.push(JSON.stringify(this.objects));
            const next = this.currentSlide.redoStack.pop();
            this.currentSlide.objects = JSON.parse(next);
            this.selectedObjects = [];
            this.selectedObject = null;
            window.soundManager.playClick();
            this.render();
            this.autoSave();
        }
    }

    clearSlide() {
        if (confirm('Clear entire whiteboard slide?')) {
            this.saveUndoState();
            this.currentSlide.objects = [];
            this.selectedObjects = [];
            this.selectedObject = null;
            window.soundManager.playErase();
            this.render();
            this.autoSave();
        }
    }

    // --- Slide Management ---
    addSlide() {
        const newId = this.slides.length + 1;
        this.slides.push({
            id: newId,
            title: `Slide ${newId}`,
            objects: [],
            undoStack: [],
            redoStack: []
        });
        this.currentSlideIndex = this.slides.length - 1;
        window.soundManager.playPop();
        this.updateSlideUI();
        this.render();
        this.autoSave();
    }

    duplicateSlide() {
        const newId = this.slides.length + 1;
        const current = this.currentSlide;
        this.slides.push({
            id: newId,
            title: `${current.title} (Copy)`,
            objects: JSON.parse(JSON.stringify(current.objects)),
            undoStack: [],
            redoStack: []
        });
        this.currentSlideIndex = this.slides.length - 1;
        window.soundManager.playPop();
        this.updateSlideUI();
        this.render();
        this.autoSave();
    }

    deleteSlide(index) {
        if (this.slides.length <= 1) {
            alert('Cannot delete the last slide.');
            return;
        }
        if (confirm(`Delete slide ${this.slides[index].title}?`)) {
            this.slides.splice(index, 1);
            if (this.currentSlideIndex >= this.slides.length) {
                this.currentSlideIndex = this.slides.length - 1;
            }
            this.selectedObjects = [];
            this.selectedObject = null;
            if (window.soundManager) window.soundManager.playErase();
            this.updateSlideUI();
            this.render();
            this.autoSave();
        }
    }

    async switchSlide(index) {
        if (index >= 0 && index < this.slides.length) {
            this.currentSlideIndex = index;
            this.selectedObjects = [];
            this.selectedObject = null;
            window.soundManager.playClick();

            // Auto-translate newly opened slide if translation toggle is ON
            if (this.isTranslationActive && window.languageTranslator) {
                await window.languageTranslator.translateObjects(this.objects, this.currentLanguage);
            }

            this.updateSlideUI();
            this.render();
            this.autoSave();
        }
    }

    // --- Sheet Language Translation & Conversion ---
    async applyTranslationToCurrentSlide(targetLang = null) {
        const lang = targetLang || this.currentLanguage || 'hinglish';
        this.currentLanguage = lang;
        if (!window.languageTranslator) return;

        if (lang === 'english' || lang === 'en') {
            this.restoreOriginalSlideLanguage();
            return;
        }

        this.showToast(`⏳ Converting sheet to ${lang.toUpperCase()}...`);
        this.saveUndoState();
        await window.languageTranslator.translateObjects(this.objects, lang);
        this.render();
        this.autoSave();
        this.showToast(`✨ Converted sheet to ${lang.toUpperCase()}!`);
        if (window.soundManager && typeof window.soundManager.playChime === 'function') {
            window.soundManager.playChime();
        }
    }

    restoreOriginalSlideLanguage() {
        if (!window.languageTranslator) return;
        this.saveUndoState();
        window.languageTranslator.restoreOriginalObjects(this.objects);
        this.render();
        this.autoSave();
        this.showToast('🔄 Restored sheet to original English!');
        if (window.soundManager && typeof window.soundManager.playPop === 'function') {
            window.soundManager.playPop();
        }
    }

    async toggleLanguageTranslation(enable, targetLang = null) {
        this.isTranslationActive = enable;
        if (targetLang) this.currentLanguage = targetLang;

        if (enable) {
            if (this.currentLanguage === 'english' || this.currentLanguage === 'en') {
                this.restoreOriginalSlideLanguage();
                this.showToast('🇬🇧 Original English Active (No translation filter)');
            } else {
                await this.applyTranslationToCurrentSlide(this.currentLanguage);
            }
        } else {
            this.restoreOriginalSlideLanguage();
        }
    }

    moveSlide(fromIndex, toIndex) {
        if (fromIndex < 0 || fromIndex >= this.slides.length || toIndex < 0 || toIndex >= this.slides.length) return;
        if (fromIndex === toIndex) return;

        const [movedSlide] = this.slides.splice(fromIndex, 1);
        this.slides.splice(toIndex, 0, movedSlide);
        this.currentSlideIndex = toIndex;
        if (window.soundManager && typeof window.soundManager.playPop === 'function') {
            window.soundManager.playPop();
        }
        this.showToast(`↔️ Moved "${movedSlide.title || ('Slide ' + (toIndex + 1))}" to position ${toIndex + 1}`);
        this.updateSlideUI();
        this.render();
        this.autoSave();
    }

    swapSlides(indexA, indexB) {
        if (indexA < 0 || indexA >= this.slides.length || indexB < 0 || indexB >= this.slides.length) return;
        if (indexA === indexB) return;

        const temp = this.slides[indexA];
        this.slides[indexA] = this.slides[indexB];
        this.slides[indexB] = temp;

        if (this.currentSlideIndex === indexA) {
            this.currentSlideIndex = indexB;
        } else if (this.currentSlideIndex === indexB) {
            this.currentSlideIndex = indexA;
        }

        if (window.soundManager && typeof window.soundManager.playPop === 'function') {
            window.soundManager.playPop();
        }
        this.showToast(`🔀 Swapped Slide ${indexA + 1} and Slide ${indexB + 1}`);
        this.updateSlideUI();
        this.render();
        this.autoSave();
    }

    moveCurrentSlideLeft() {
        if (this.currentSlideIndex > 0) {
            this.moveSlide(this.currentSlideIndex, this.currentSlideIndex - 1);
        } else {
            this.showToast('ℹ️ Already at the first slide position');
        }
    }

    moveCurrentSlideRight() {
        if (this.currentSlideIndex < this.slides.length - 1) {
            this.moveSlide(this.currentSlideIndex, this.currentSlideIndex + 1);
        } else {
            this.showToast('ℹ️ Already at the last slide position');
        }
    }

    setTheme(themeName) {
        this.theme = themeName;
        this.customBgColor = null;
        if (this.currentSlide) {
            delete this.currentSlide.bgColor;
        }
        this.render();
        this.autoSave();
    }

    setCustomBgColor(color, applyToAll = false) {
        this.saveUndoState();
        if (applyToAll) {
            this.customBgColor = color;
            this.slides.forEach(s => s.bgColor = color);
        } else {
            this.currentSlide.bgColor = color;
            this.customBgColor = color;
        }
        this.render();
        this.autoSave();
    }

    getSlideBgColor(slide = null) {
        const target = slide || this.currentSlide;
        if (target && target.bgColor) return target.bgColor;
        if (this.customBgColor) return this.customBgColor;
        switch (this.theme) {
            case 'dark': return '#0f172a';
            case 'blackboard': return '#1b2d2a';
            case 'blueprint': return '#0c4a6e';
            case 'grid': return '#f8fafc';
            case 'dots': return '#ffffff';
            case 'lines': return '#fffdf7';
            default: return '#ffffff';
        }
    }

    isDarkColor(color) {
        if (!color || color === 'transparent') return false;
        try {
            if (color.startsWith('#')) {
                let c = color.substring(1);
                if (c.length === 3) c = c.split('').map(x => x + x).join('');
                const r = parseInt(c.substr(0, 2), 16) || 0;
                const g = parseInt(c.substr(2, 2), 16) || 0;
                const b = parseInt(c.substr(4, 2), 16) || 0;
                const lum = (0.299 * r + 0.587 * g + 0.114 * b);
                return lum < 140;
            } else if (color.startsWith('rgb')) {
                const m = color.match(/\d+/g);
                if (m && m.length >= 3) {
                    const lum = (0.299 * (+m[0]) + 0.587 * (+m[1]) + 0.114 * (+m[2]));
                    return lum < 140;
                }
            }
        } catch(e) {}
        return false;
    }

    resetView() {
        this.scale = 1.0;
        this.panX = 0;
        this.panY = 0;
        this.updateZoomDisplay();
        this.render();
    }

    zoomIn() {
        this.scale = Math.min(this.scale * 1.2, this.maxScale);
        this.updateZoomDisplay();
        this.render();
    }

    zoomOut() {
        this.scale = Math.max(this.scale / 1.2, this.minScale);
        this.updateZoomDisplay();
        this.render();
    }

    updateZoomDisplay() {
        const el = document.getElementById('zoom-percentage');
        if (el) el.textContent = `${Math.round(this.scale * 100)}%`;
    }

    renameSlidePrompt(idx) {
        const slide = this.slides[idx];
        if (!slide) return;
        const container = document.getElementById('slide-thumbnails');
        if (!container) return;

        const thumbEl = container.children[idx];
        if (!thumbEl) return;

        const titleEl = thumbEl.querySelector('.slide-thumb-title');
        if (!titleEl) return;

        if (thumbEl.querySelector('input.slide-rename-input')) return;

        const bottomBar = document.getElementById('bottom-slide-bar');
        if (bottomBar) {
            bottomBar.classList.add('slide-renaming-active');
        }

        const wrapper = document.createElement('div');
        wrapper.className = 'slide-rename-wrap flex items-center gap-1 z-30';

        const input = document.createElement('input');
        input.type = 'text';
        input.className = 'slide-rename-input text-[10px] sm:text-xs font-bold text-center bg-white dark:bg-slate-900 border-2 border-indigo-500 rounded px-1.5 py-0.5 w-[65px] sm:w-[90px] outline-none shadow-md z-30 text-slate-900 dark:text-slate-100 ring-2 ring-indigo-400/50';
        input.value = slide.title || `Slide ${idx + 1}`;
        input.maxLength = 32;

        const saveBtn = document.createElement('button');
        saveBtn.type = 'button';
        saveBtn.title = 'Confirm Rename';
        saveBtn.className = 'slide-rename-confirm-btn w-5 h-5 rounded bg-indigo-600 hover:bg-indigo-700 text-white flex items-center justify-center text-[10px] shadow-sm shrink-0 active:scale-95 transition';
        saveBtn.innerHTML = '<i class="fa-solid fa-check"></i>';

        wrapper.appendChild(input);
        wrapper.appendChild(saveBtn);

        let isDone = false;

        const adjustForKeyboard = () => {
            if (!bottomBar || isDone) return;
            const isMobile = window.innerWidth <= 768 || ('ontouchstart' in window) || (navigator.maxTouchPoints && navigator.maxTouchPoints > 0);
            const vv = window.visualViewport;

            if (isMobile) {
                let keyboardOcclusion = 0;
                if (vv) {
                    const vpHeight = vv.height;
                    const vpTop = vv.offsetTop;
                    const winHeight = window.innerHeight;
                    keyboardOcclusion = Math.max(0, winHeight - (vpHeight + vpTop));
                }

                if (keyboardOcclusion > 40) {
                    bottomBar.style.bottom = `${keyboardOcclusion + 14}px`;
                } else {
                    // Mobile virtual keyboard default lift to ensure input goes up above keyboard
                    const estLift = Math.max(220, Math.min(340, window.innerHeight * 0.42));
                    bottomBar.style.bottom = `${estLift}px`;
                }
            } else {
                bottomBar.style.bottom = '';
            }

            if (thumbEl) {
                thumbEl.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
            }
        };

        const cleanup = () => {
            if (isDone) return;
            isDone = true;
            if (bottomBar) {
                bottomBar.classList.remove('slide-renaming-active');
                bottomBar.style.bottom = '';
                bottomBar.style.zIndex = '';
            }
            if (window.visualViewport) {
                window.visualViewport.removeEventListener('resize', adjustForKeyboard);
                window.visualViewport.removeEventListener('scroll', adjustForKeyboard);
            }
            window.removeEventListener('resize', adjustForKeyboard);
        };

        const commitRename = () => {
            if (isDone) return;
            const val = input.value.trim();
            cleanup();
            if (val && val !== slide.title) {
                slide.title = val;
                this.autoSave();
                this.showToast(`🏷️ Slide renamed to "${val}"`);
            }
            this.updateSlideUI();
        };

        const cancelRename = () => {
            if (isDone) return;
            cleanup();
            this.updateSlideUI();
        };

        input.addEventListener('keydown', (e) => {
            e.stopPropagation();
            if (e.key === 'Enter') {
                e.preventDefault();
                commitRename();
            } else if (e.key === 'Escape') {
                e.preventDefault();
                cancelRename();
            }
        });

        saveBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            commitRename();
        });
        saveBtn.addEventListener('touchend', (e) => {
            e.stopPropagation();
            commitRename();
        });

        input.addEventListener('blur', () => {
            setTimeout(() => {
                if (!isDone) commitRename();
            }, 120);
        });

        wrapper.addEventListener('click', (e) => e.stopPropagation());
        wrapper.addEventListener('dblclick', (e) => e.stopPropagation());
        wrapper.addEventListener('pointerdown', (e) => e.stopPropagation());

        titleEl.replaceWith(wrapper);

        // Viewport listener attachments for dynamic screen lift
        if (window.visualViewport) {
            window.visualViewport.addEventListener('resize', adjustForKeyboard);
            window.visualViewport.addEventListener('scroll', adjustForKeyboard);
        }
        window.addEventListener('resize', adjustForKeyboard);

        // Multi-stage timeout for smooth keyboard slide-up animation
        setTimeout(adjustForKeyboard, 40);
        setTimeout(adjustForKeyboard, 120);
        setTimeout(adjustForKeyboard, 250);
        setTimeout(adjustForKeyboard, 450);

        setTimeout(() => {
            input.focus();
            input.select();
            adjustForKeyboard();
        }, 30);
    }

    updateSlideUI() {
        const container = document.getElementById('slide-thumbnails');
        if (!container) return;
        container.innerHTML = '';

        this.slides.forEach((slide, idx) => {
            const isActive = (idx === this.currentSlideIndex);
            const btn = document.createElement('div');
            btn.draggable = true;
            btn.className = `slide-thumb group relative flex flex-col items-center justify-center p-1 sm:p-2 rounded-lg cursor-grab active:cursor-grabbing transition-all border shrink-0 ${
                isActive 
                    ? 'border-indigo-600 dark:border-indigo-400 bg-indigo-500/20 shadow-md ring-2 ring-indigo-500/80 scale-105 font-bold z-10' 
                    : 'border-slate-300/40 dark:border-slate-700/60 bg-white/40 dark:bg-slate-800/40 hover:bg-slate-100 dark:hover:bg-slate-700 opacity-80 hover:opacity-100'
            }`;
            btn.title = `Slide ${idx + 1}: ${slide.title} (Drag to reorder / Double-click to rename)`;

            btn.innerHTML = `
                <div class="slide-thumb-box w-8 h-6 sm:w-16 sm:h-10 rounded border ${
                    isActive 
                        ? 'border-indigo-500 dark:border-indigo-400 bg-indigo-50 dark:bg-indigo-950/80 text-indigo-700 dark:text-indigo-200 font-extrabold shadow-sm' 
                        : 'border-dashed border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 font-semibold'
                } flex items-center justify-center text-[10px] sm:text-xs relative overflow-hidden select-none">
                    <span>${idx + 1}</span>
                    ${idx > 0 ? `<button class="slide-mini-move-prev absolute left-0.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 sm:w-4 sm:h-4 rounded bg-slate-800/80 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 hover:bg-indigo-600 transition-opacity text-[8px] z-10" title="Move Left">◀</button>` : ''}
                    ${idx < this.slides.length - 1 ? `<button class="slide-mini-move-next absolute right-0.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 sm:w-4 sm:h-4 rounded bg-slate-800/80 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 hover:bg-indigo-600 transition-opacity text-[8px] z-10" title="Move Right">▶</button>` : ''}
                    <i class="fa-solid fa-pen text-[7px] sm:text-[9px] absolute top-1 right-1 ${isActive ? 'opacity-80 text-indigo-600 dark:text-indigo-400' : 'opacity-0 group-hover:opacity-60 text-slate-400'} cursor-pointer p-0.5 hover:scale-110 transition" title="Rename page"></i>
                </div>
                <span class="slide-thumb-title text-[8px] sm:text-[10px] mt-0.5 sm:mt-1 ${isActive ? 'font-bold text-indigo-600 dark:text-indigo-400' : 'font-medium text-slate-600 dark:text-slate-300'} truncate max-w-[45px] sm:max-w-[75px] text-center select-none cursor-pointer" title="${slide.title}">${slide.title}</span>
            `;

            // Mini swap arrow buttons
            const prevMoveBtn = btn.querySelector('.slide-mini-move-prev');
            if (prevMoveBtn) {
                prevMoveBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    this.moveSlide(idx, idx - 1);
                });
            }

            const nextMoveBtn = btn.querySelector('.slide-mini-move-next');
            if (nextMoveBtn) {
                nextMoveBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    this.moveSlide(idx, idx + 1);
                });
            }

            // Pen icon direct rename click
            const penIcon = btn.querySelector('.fa-pen');
            if (penIcon) {
                penIcon.addEventListener('click', (e) => {
                    e.stopPropagation();
                    this.renameSlidePrompt(idx);
                });
            }

            // Direct title click to rename active slide
            const titleEl = btn.querySelector('.slide-thumb-title');
            if (titleEl) {
                titleEl.addEventListener('click', (e) => {
                    if (isActive) {
                        e.stopPropagation();
                        this.renameSlidePrompt(idx);
                    }
                });
            }

            // HTML5 Drag and Drop Reordering
            btn.addEventListener('dragstart', (e) => {
                e.dataTransfer.setData('text/plain', idx.toString());
                e.dataTransfer.effectAllowed = 'move';
                btn.classList.add('opacity-40', 'scale-95');
            });

            btn.addEventListener('dragend', () => {
                btn.classList.remove('opacity-40', 'scale-95');
                document.querySelectorAll('.slide-thumb').forEach(el => {
                    el.classList.remove('ring-2', 'ring-indigo-400', 'border-indigo-400', 'bg-indigo-50', 'dark:bg-indigo-950/50');
                });
            });

            btn.addEventListener('dragover', (e) => {
                e.preventDefault();
                e.dataTransfer.dropEffect = 'move';
                btn.classList.add('ring-2', 'ring-indigo-400', 'border-indigo-400', 'bg-indigo-50', 'dark:bg-indigo-950/50');
            });

            btn.addEventListener('dragleave', () => {
                btn.classList.remove('ring-2', 'ring-indigo-400', 'border-indigo-400', 'bg-indigo-50', 'dark:bg-indigo-950/50');
            });

            btn.addEventListener('drop', (e) => {
                e.preventDefault();
                btn.classList.remove('ring-2', 'ring-indigo-400', 'border-indigo-400', 'bg-indigo-50', 'dark:bg-indigo-950/50');
                const fromIdxStr = e.dataTransfer.getData('text/plain');
                if (fromIdxStr !== '') {
                    const fromIdx = parseInt(fromIdxStr, 10);
                    if (!isNaN(fromIdx) && fromIdx !== idx) {
                        this.moveSlide(fromIdx, idx);
                    }
                }
            });

            // Single click to switch slide
            btn.onclick = (e) => {
                e.stopPropagation();
                this.switchSlide(idx);
            };

            // Double click to rename slide
            btn.ondblclick = (e) => {
                e.stopPropagation();
                this.renameSlidePrompt(idx);
            };

            // Touch double tap support
            let lastTapTime = 0;
            btn.addEventListener('touchend', (e) => {
                const now = Date.now();
                if (now - lastTapTime < 350) {
                    e.preventDefault();
                    e.stopPropagation();
                    this.renameSlidePrompt(idx);
                }
                lastTapTime = now;
            });

            container.appendChild(btn);
        });

        // Automatically scroll active slide thumbnail smoothly into center view
        const activeThumb = container.children[this.currentSlideIndex];
        if (activeThumb) {
            setTimeout(() => {
                activeThumb.scrollIntoView({
                    behavior: 'smooth',
                    block: 'nearest',
                    inline: 'center'
                });
            }, 20);
        }

        const currentSlideEl = document.getElementById('current-slide-num');
        if (currentSlideEl) {
            currentSlideEl.textContent = `${this.currentSlideIndex + 1} / ${this.slides.length}`;
        }
    }

    triggerPropertySync(obj) {
        if (window.syncObjectProperties) {
            window.syncObjectProperties(obj);
        }
    }

    // --- Animation & Rendering Loop ---
    startAnimationLoop() {
        const loop = () => {
            if (this.spotlightMode || this.laserTrail.length > 0 || this._overlayHasContent) {
                this.renderOverlay();
            }
            requestAnimationFrame(loop);
        };
        requestAnimationFrame(loop);
    }

    render() {
        this._renderPending = false;
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        const w = this.canvas.width / dpr;
        const h = this.canvas.height / dpr;

        this.ctx.save();
        this.ctx.clearRect(0, 0, w, h);

        // 1. Background Paper Texture & Custom Color
        this.drawBackground(w, h);

        // 2. World Camera Transform
        this.ctx.translate(this.panX, this.panY);
        this.ctx.scale(this.scale, this.scale);

        // 3. Render Objects
        this.objects.forEach(obj => this.renderObject(this.ctx, obj));

        // 4. Render Current Stroke
        if (this.currentStroke) {
            this.renderObject(this.ctx, this.currentStroke);
        }

        // 5. Render Marquee Box Selection
        if (this.isSelectingArea && this.selectionBox) {
            this.renderMarqueeBox(this.ctx, this.selectionBox);
        }

        // 6. Render Selection Box (Single or Multi)
        if (this.selectedObjects && this.selectedObjects.length > 0) {
            if (this.selectedObjects.length === 1) {
                this.renderSelection(this.ctx, this.selectedObjects[0]);
            } else {
                this.renderMultiSelection(this.ctx, this.selectedObjects);
            }
        }

        this.ctx.restore();

        // 7. Update Hardware-Accelerated Animated GIF Layer
        this.updateGifOverlays();
    }

    drawBackground(w, h) {
        let bgColor = this.getSlideBgColor();
        let gridColor = '#e2e8f0';

        const isDark = this.isDarkColor(bgColor);

        if (this.theme === 'blackboard') {
            gridColor = 'rgba(255, 255, 255, 0.08)';
        } else if (this.theme === 'blueprint') {
            gridColor = 'rgba(255, 255, 255, 0.15)';
        } else if (this.theme === 'dots') {
            gridColor = isDark ? 'rgba(255, 255, 255, 0.3)' : '#94a3b8';
        } else if (this.theme === 'lines') {
            gridColor = isDark ? 'rgba(255, 255, 255, 0.15)' : '#fed7aa';
        } else if (isDark) {
            gridColor = 'rgba(255, 255, 255, 0.1)';
        } else {
            gridColor = '#e2e8f0';
        }

        this.ctx.fillStyle = bgColor;
        this.ctx.fillRect(0, 0, w, h);

        if (!this.showGrid) return;

        const step = this.gridSize * this.scale;
        const offsetX = this.panX % step;
        const offsetY = this.panY % step;

        this.ctx.save();
        this.ctx.strokeStyle = gridColor;
        this.ctx.fillStyle = gridColor;
        this.ctx.lineWidth = 1;

        if (this.theme === 'dots') {
            for (let x = offsetX; x < w; x += step) {
                for (let y = offsetY; y < h; y += step) {
                    this.ctx.beginPath();
                    this.ctx.arc(x, y, 1.2, 0, Math.PI * 2);
                    this.ctx.fill();
                }
            }
        } else if (this.theme === 'lines') {
            for (let y = offsetY; y < h; y += step * 1.5) {
                this.ctx.beginPath();
                this.ctx.moveTo(0, y);
                this.ctx.lineTo(w, y);
                this.ctx.stroke();
            }
        } else {
            this.ctx.beginPath();
            for (let x = offsetX; x < w; x += step) {
                this.ctx.moveTo(x, 0);
                this.ctx.lineTo(x, h);
            }
            for (let y = offsetY; y < h; y += step) {
                this.ctx.moveTo(0, y);
                this.ctx.lineTo(w, y);
            }
            this.ctx.stroke();
        }
        this.ctx.restore();
    }

    renderObject(ctx, obj) {
        ctx.save();
        ctx.strokeStyle = obj.strokeColor || '#000000';
        ctx.fillStyle = obj.fillColor || 'transparent';
        ctx.lineWidth = obj.strokeWidth || 3;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';

        if (obj.opacity !== undefined) {
            ctx.globalAlpha = obj.opacity;
        }

        if (obj.strokeDash === 'dashed') ctx.setLineDash([8, 6]);
        else if (obj.strokeDash === 'dotted') ctx.setLineDash([3, 4]);
        else ctx.setLineDash([]);

        if (obj.rotation || obj.flipH || obj.flipV) {
            let cx = 0, cy = 0;
            if (obj.x !== undefined && obj.width !== undefined) {
                cx = obj.x + (obj.width || 0) / 2;
                cy = obj.y + (obj.height || 0) / 2;
            } else if (obj.x1 !== undefined && obj.x2 !== undefined) {
                cx = (obj.x1 + obj.x2) / 2;
                cy = (obj.y1 + obj.y2) / 2;
            } else if (obj.points && obj.points.length > 0) {
                const b = this.getObjectBounds(obj);
                if (b) { cx = (b.minX + b.maxX) / 2; cy = (b.minY + b.maxY) / 2; }
            }
            if (obj.rotation) {
                ctx.translate(cx, cy);
                ctx.rotate(obj.rotation);
                ctx.translate(-cx, -cy);
            }
            if (obj.flipH || obj.flipV) {
                ctx.translate(cx, cy);
                ctx.scale(obj.flipH ? -1 : 1, obj.flipV ? -1 : 1);
                ctx.translate(-cx, -cy);
            }
        }

        switch (obj.type) {
            case 'freehand':
                this.renderSmoothFreehand(ctx, obj);
                break;

            case 'rectangle':
            case 'rect':
            case 'square':
                if (obj.rounded) {
                    this.drawRoundedRect(ctx, obj.x, obj.y, obj.width, obj.height, 10);
                } else {
                    ctx.beginPath();
                    ctx.rect(obj.x, obj.y, obj.width, obj.height);
                    if (obj.fillColor && obj.fillColor !== 'transparent') ctx.fill();
                    ctx.stroke();
                }
                break;

            case 'ellipse':
                ctx.beginPath();
                const rx = obj.radiusX || Math.abs(obj.width) / 2 || 10;
                const ry = obj.radiusY || Math.abs(obj.height) / 2 || 10;
                const cx = obj.radiusX ? obj.x : obj.x + obj.width / 2;
                const cy = obj.radiusY ? obj.y : obj.y + obj.height / 2;
                ctx.ellipse(cx, cy, rx, ry, 0, 0, Math.PI * 2);
                if (obj.fillColor && obj.fillColor !== 'transparent') ctx.fill();
                ctx.stroke();
                break;

            case 'triangle':
                ctx.beginPath();
                if (obj.x1 !== undefined && obj.x2 !== undefined && obj.x3 !== undefined) {
                    ctx.moveTo(obj.x1, obj.y1);
                    ctx.lineTo(obj.x2, obj.y2);
                    ctx.lineTo(obj.x3, obj.y3);
                } else {
                    ctx.moveTo(obj.x + obj.width / 2, obj.y);
                    ctx.lineTo(obj.x + obj.width, obj.y + obj.height);
                    ctx.lineTo(obj.x, obj.y + obj.height);
                }
                ctx.closePath();
                if (obj.fillColor && obj.fillColor !== 'transparent') ctx.fill();
                ctx.stroke();
                break;

            case 'diamond':
                ctx.beginPath();
                const dcx = obj.x + obj.width / 2;
                const dcy = obj.y + obj.height / 2;
                ctx.moveTo(dcx, obj.y);
                ctx.lineTo(obj.x + obj.width, dcy);
                ctx.lineTo(dcx, obj.y + obj.height);
                ctx.lineTo(obj.x, dcy);
                ctx.closePath();
                if (obj.fillColor && obj.fillColor !== 'transparent') ctx.fill();
                ctx.stroke();
                break;

            case 'star':
                this.drawStar(ctx, obj.x + obj.width / 2, obj.y + obj.height / 2, 5, Math.abs(obj.width) / 2, Math.abs(obj.width) / 4);
                if (obj.fillColor && obj.fillColor !== 'transparent') ctx.fill();
                ctx.stroke();
                break;

            case 'line':
            case 'arrow':
                ctx.beginPath();
                ctx.moveTo(obj.x1, obj.y1);
                ctx.lineTo(obj.x2, obj.y2);
                ctx.stroke();

                if (obj.arrowEnd) {
                    const angle = Math.atan2(obj.y2 - obj.y1, obj.x2 - obj.x1);
                    const headlen = 14;
                    ctx.beginPath();
                    ctx.moveTo(obj.x2, obj.y2);
                    ctx.lineTo(obj.x2 - headlen * Math.cos(angle - Math.PI / 6), obj.y2 - headlen * Math.sin(angle - Math.PI / 6));
                    ctx.moveTo(obj.x2, obj.y2);
                    ctx.lineTo(obj.x2 - headlen * Math.cos(angle + Math.PI / 6), obj.y2 - headlen * Math.sin(angle + Math.PI / 6));
                    ctx.stroke();
                }
                break;

            case 'curve':
            case 'curve-arrow':
                ctx.beginPath();
                ctx.moveTo(obj.x1, obj.y1);
                const cmx = (obj.x1 + obj.x2) / 2;
                const cmy = (obj.y1 + obj.y2) / 2;
                const cdx = obj.x2 - obj.x1;
                const cdy = obj.y2 - obj.y1;
                const curv = obj.curvature || 0.22;
                const ctrlX = obj.cx !== undefined ? obj.cx : (cmx - cdy * curv);
                const ctrlY = obj.cy !== undefined ? obj.cy : (cmy + cdx * curv);
                ctx.quadraticCurveTo(ctrlX, ctrlY, obj.x2, obj.y2);
                ctx.stroke();

                if (obj.arrowEnd || obj.type === 'curve-arrow') {
                    const angle = Math.atan2(obj.y2 - ctrlY, obj.x2 - ctrlX);
                    const headlen = 14;
                    ctx.beginPath();
                    ctx.moveTo(obj.x2, obj.y2);
                    ctx.lineTo(obj.x2 - headlen * Math.cos(angle - Math.PI / 6), obj.y2 - headlen * Math.sin(angle - Math.PI / 6));
                    ctx.moveTo(obj.x2, obj.y2);
                    ctx.lineTo(obj.x2 - headlen * Math.cos(angle + Math.PI / 6), obj.y2 - headlen * Math.sin(angle + Math.PI / 6));
                    ctx.stroke();
                }
                break;

            case 'text':
                if (this.activeInlineEditor && this.activeInlineEditor.targetObject === obj) {
                    break;
                }
                const fSize = obj.fontSize || 20;
                const fWeight = obj.fontWeight || 'normal';
                const fColor = obj.fontColor || obj.textColor || obj.strokeColor || this.fontColor || '#1e293b';
                ctx.font = `${fWeight} ${fSize}px ${this.fontFamily}`;
                
                const rawLines = (obj.text || '').split('\n');
                const lineH = (obj.lineHeight || 1.4);
                const maxTextW = obj.maxWidth || (obj.width && obj.width > 20 ? obj.width : null);

                let displayLines = [];
                if (maxTextW) {
                    rawLines.forEach(rawLine => {
                        if (!rawLine || ctx.measureText(rawLine).width <= maxTextW) {
                            displayLines.push(rawLine);
                        } else {
                            const words = rawLine.split(' ');
                            let curLine = '';
                            for (let wIdx = 0; wIdx < words.length; wIdx++) {
                                const word = words[wIdx];
                                const testLine = curLine ? `${curLine} ${word}` : word;
                                if (ctx.measureText(testLine).width <= maxTextW) {
                                    curLine = testLine;
                                } else {
                                    if (curLine) {
                                        displayLines.push(curLine);
                                        curLine = word;
                                    } else {
                                        let chunk = '';
                                        for (let c = 0; c < word.length; c++) {
                                            const testChunk = chunk + word[c];
                                            if (ctx.measureText(testChunk).width <= maxTextW) {
                                                chunk = testChunk;
                                            } else {
                                                if (chunk) displayLines.push(chunk);
                                                chunk = word[c];
                                            }
                                        }
                                        curLine = chunk;
                                    }
                                }
                            }
                            if (curLine) displayLines.push(curLine);
                        }
                    });
                } else {
                    displayLines = rawLines;
                }

                if (obj.maxLines && displayLines.length > obj.maxLines) {
                    displayLines = displayLines.slice(0, obj.maxLines);
                    let lastLine = displayLines[displayLines.length - 1];
                    if (maxTextW) {
                        while (ctx.measureText(lastLine + '...').width > maxTextW && lastLine.length > 3) {
                            lastLine = lastLine.slice(0, -1);
                        }
                    }
                    displayLines[displayLines.length - 1] = lastLine + '...';
                }

                if (obj.bgColor && obj.bgColor !== 'transparent') {
                    let maxLW = 0;
                    displayLines.forEach(l => {
                        const clean = (l.startsWith('~~') && l.endsWith('~~') && l.length >= 4) ? l.slice(2, -2) : l;
                        const lw = ctx.measureText(clean).width;
                        if (lw > maxLW) maxLW = lw;
                    });
                    const totalH = displayLines.length * (fSize * lineH);
                    ctx.save();
                    ctx.fillStyle = obj.bgColor;
                    this.drawRoundedRect(ctx, obj.x - 6, obj.y - fSize + 2, maxLW + 12, totalH + 8, 6);
                    ctx.fill();
                    ctx.restore();
                }

                ctx.fillStyle = fColor;
                displayLines.forEach((l, idx) => {
                    const isLineStruck = obj.strikethrough || (l.startsWith('~~') && l.endsWith('~~') && l.length >= 4);
                    const displayLine = (l.startsWith('~~') && l.endsWith('~~') && l.length >= 4) ? l.slice(2, -2) : l;
                    const lineY = obj.y + idx * (fSize * lineH);
                    ctx.fillText(displayLine, obj.x, lineY);
                    if (isLineStruck) {
                        const lw = ctx.measureText(displayLine).width;
                        ctx.save();
                        ctx.beginPath();
                        ctx.strokeStyle = fColor;
                        ctx.lineWidth = Math.max(1.5, fSize / 14);
                        const strikeY = lineY - (fSize * 0.32);
                        ctx.moveTo(obj.x, strikeY);
                        ctx.lineTo(obj.x + lw, strikeY);
                        ctx.stroke();
                        ctx.restore();
                    }
                });
                break;

            case 'sticky':
                this.renderStickyNote(ctx, obj);
                break;

            case 'quiz':
                this.renderQuizCard(ctx, obj);
                break;

            case 'element':
                this.renderElementCard(ctx, obj);
                break;

            case 'latex':
                this.renderLatexCard(ctx, obj);
                break;

            case 'image':
                const isAnimatedGif = obj.isGif || (obj.src && (obj.src.includes('.gif') || obj.src.startsWith('data:imagegif')));
                try {
                    if (isAnimatedGif) {
                        if (this._isExporting && obj.img) {
                            ctx.drawImage(obj.img, obj.x, obj.y, obj.width, obj.height);
                        }
                    } else {
                        if (obj.img) {
                            ctx.drawImage(obj.img, obj.x, obj.y, obj.width, obj.height);
                        } else if (obj.src) {
                            const img = new Image();
                            img.crossOrigin = 'anonymous';
                            img.onload = () => { obj.img = img; this.render(); };
                            img.src = obj.src;
                        }
                    }
                } catch (imgErr) {
                    console.warn('Error drawing image element:', imgErr);
                }
                break;

            case 'lens':
                this.renderLensBox(ctx, obj);
                break;
        }

        ctx.restore();
    }

    // --- Ultra-Smooth Catmull-Rom & Quadratic Bézier Freehand Renderer ---
    renderSmoothFreehand(ctx, obj) {
        const pts = obj.points;
        if (!pts || pts.length === 0) return;

        if (pts.length === 1) {
            ctx.beginPath();
            ctx.arc(pts[0].x, pts[0].y, obj.strokeWidth / 2, 0, Math.PI * 2);
            ctx.fillStyle = obj.strokeColor;
            ctx.fill();
            return;
        }

        ctx.beginPath();
        ctx.moveTo(pts[0].x, pts[0].y);

        if (pts.length === 2) {
            ctx.lineTo(pts[1].x, pts[1].y);
            ctx.stroke();
            return;
        }

        for (let i = 1; i < pts.length - 1; i++) {
            const midX = (pts[i].x + pts[i + 1].x) / 2;
            const midY = (pts[i].y + pts[i + 1].y) / 2;
            ctx.quadraticCurveTo(pts[i].x, pts[i].y, midX, midY);
        }

        const last = pts[pts.length - 1];
        ctx.lineTo(last.x, last.y);
        ctx.stroke();
    }

    drawRoundedRect(ctx, x, y, w, h, r) {
        if (w < 0) { x += w; w = Math.abs(w); }
        if (h < 0) { y += h; h = Math.abs(h); }
        r = Math.min(r, w / 2, h / 2);
        ctx.beginPath();
        ctx.moveTo(x + r, y);
        ctx.arcTo(x + w, y, x + w, y + h, r);
        ctx.arcTo(x + w, y + h, x, y + h, r);
        ctx.arcTo(x, y + h, x, y, r);
        ctx.arcTo(x, y, x + w, y, r);
        ctx.closePath();
        if (ctx.fillStyle && ctx.fillStyle !== 'transparent') ctx.fill();
        ctx.stroke();
    }

    drawStar(ctx, cx, cy, spikes, outerRadius, innerRadius) {
        let rot = Math.PI / 2 * 3;
        let x = cx;
        let y = cy;
        let step = Math.PI / spikes;

        ctx.beginPath();
        ctx.moveTo(cx, cy - outerRadius);
        for (let i = 0; i < spikes; i++) {
            x = cx + Math.cos(rot) * outerRadius;
            y = cy + Math.sin(rot) * outerRadius;
            ctx.lineTo(x, y);
            rot += step;

            x = cx + Math.cos(rot) * innerRadius;
            y = cy + Math.sin(rot) * innerRadius;
            ctx.lineTo(x, y);
            rot += step;
        }
        ctx.lineTo(cx, cy - outerRadius);
        ctx.closePath();
    }

    renderStickyNote(ctx, obj) {
        ctx.save();
        ctx.shadowColor = 'rgba(0, 0, 0, 0.12)';
        ctx.shadowBlur = 12;
        ctx.shadowOffsetY = 6;

        ctx.fillStyle = obj.bgColor || '#fef08a';
        ctx.strokeStyle = 'rgba(0,0,0,0.08)';
        ctx.lineWidth = 1.2;

        const left = obj.width < 0 ? obj.x + obj.width : obj.x;
        const top = obj.height < 0 ? obj.y + obj.height : obj.y;
        const w = Math.abs(obj.width || 180);
        const h = Math.abs(obj.height || 160);

        this.drawRoundedRect(ctx, left, top, w, h, 10);

        // Clip all text and inner elements strictly inside the rounded box boundary
        ctx.save();
        ctx.beginPath();
        const r = Math.min(10, w / 2, h / 2);
        ctx.moveTo(left + r, top);
        ctx.arcTo(left + w, top, left + w, top + h, r);
        ctx.arcTo(left + w, top + h, left, top + h, r);
        ctx.arcTo(left, top + h, left, top, r);
        ctx.arcTo(left, top, left + w, top, r);
        ctx.closePath();
        ctx.clip();

        // Pin graphic
        ctx.shadowColor = 'transparent';
        ctx.fillStyle = '#ef4444';
        ctx.beginPath();
        ctx.arc(left + w / 2, top + 11, 4.5, 0, Math.PI * 2);
        ctx.fill();

        if (this.activeInlineEditor && this.activeInlineEditor.targetObject === obj) {
            ctx.restore();
            ctx.restore();
            return;
        }

        // Wrap & Render Text strictly within box boundaries
        ctx.fillStyle = obj.textColor || '#1e293b';
        let fontSize = obj.fontSize || 13;
        ctx.font = `${obj.fontWeight || 'normal'} ${fontSize}px ${this.fontFamily}`;
        
        const padX = 16;
        const padTop = 28;
        const padBottom = 12;
        const maxTextWidth = Math.max(20, w - padX * 2);
        let lineHeight = Math.round(fontSize * 1.42);
        let maxLines = Math.max(1, Math.floor((h - padTop - padBottom) / lineHeight));

        // Multi-line word wrap algorithm
        const rawParagraphs = (obj.text || '').split('\n');

        const doWrap = (fs, lh) => {
            const lines = [];
            ctx.font = `${obj.fontWeight || 'normal'} ${fs}px ${this.fontFamily}`;
            for (let p = 0; p < rawParagraphs.length; p++) {
                const paragraph = rawParagraphs[p];
                if (paragraph === '') {
                    lines.push('');
                    continue;
                }

                const words = paragraph.split(' ');
                let currentLine = '';

                for (let wordIdx = 0; wordIdx < words.length; wordIdx++) {
                    const word = words[wordIdx];
                    const testLine = currentLine ? `${currentLine} ${word}` : word;
                    const testWidth = ctx.measureText(testLine).width;

                    if (testWidth <= maxTextWidth) {
                        currentLine = testLine;
                    } else {
                        if (currentLine) {
                            lines.push(currentLine);
                            currentLine = word;
                        } else {
                            let chunk = '';
                            for (let c = 0; c < word.length; c++) {
                                const testChunk = chunk + word[c];
                                if (ctx.measureText(testChunk).width <= maxTextWidth) {
                                    chunk = testChunk;
                                } else {
                                    if (chunk) lines.push(chunk);
                                    chunk = word[c];
                                }
                            }
                            currentLine = chunk;
                        }
                    }
                }
                if (currentLine) {
                    lines.push(currentLine);
                }
            }
            return lines;
        };

        let wrappedLines = doWrap(fontSize, lineHeight);

        // If wrapped lines exceed maxLines slightly, auto-adjust font size down to 10px so text fits inside
        if (wrappedLines.length > maxLines && fontSize > 10) {
            fontSize = Math.max(10, fontSize - 1);
            lineHeight = Math.round(fontSize * 1.38);
            maxLines = Math.max(1, Math.floor((h - padTop - padBottom) / lineHeight));
            wrappedLines = doWrap(fontSize, lineHeight);
            if (wrappedLines.length > maxLines && fontSize > 10) {
                fontSize = Math.max(10, fontSize - 1);
                lineHeight = Math.round(fontSize * 1.35);
                maxLines = Math.max(1, Math.floor((h - padTop - padBottom) / lineHeight));
                wrappedLines = doWrap(fontSize, lineHeight);
            }
        }

        // Render wrapped lines safely within box height - NEVER exceed maxLines
        for (let i = 0; i < wrappedLines.length && i < maxLines; i++) {
            let lineStr = wrappedLines[i];
            const lineY = top + padTop + (i + 1) * lineHeight - 4;

            // If this is the last visible line and there is remaining content, append ellipsis
            if (i === maxLines - 1 && wrappedLines.length > maxLines) {
                while (ctx.measureText(lineStr + '...').width > maxTextWidth && lineStr.length > 3) {
                    lineStr = lineStr.slice(0, -1);
                }
                lineStr += '...';
            }

            const isLineStruck = obj.strikethrough || (lineStr.startsWith('~~') && lineStr.endsWith('~~') && lineStr.length >= 4);
            const displayStr = (lineStr.startsWith('~~') && lineStr.endsWith('~~') && lineStr.length >= 4) ? lineStr.slice(2, -2) : lineStr;

            if (displayStr.startsWith('🤖') || displayStr.startsWith('💡') || displayStr.startsWith('📌') || displayStr.startsWith('🌐') || displayStr.startsWith('🔢') || displayStr.startsWith('🇮🇳') || displayStr.startsWith('📊')) {
                ctx.font = `bold ${fontSize + 1}px ${this.fontFamily}`;
            } else {
                ctx.font = `${obj.fontWeight || 'normal'} ${fontSize}px ${this.fontFamily}`;
            }

            ctx.fillText(displayStr, left + padX, lineY);

            if (isLineStruck) {
                const lw = ctx.measureText(displayStr).width;
                ctx.save();
                ctx.beginPath();
                ctx.strokeStyle = obj.textColor || '#1e293b';
                ctx.lineWidth = Math.max(1.5, fontSize / 14);
                const strikeY = lineY - (fontSize * 0.32);
                ctx.moveTo(left + padX, strikeY);
                ctx.lineTo(left + padX + lw, strikeY);
                ctx.stroke();
                ctx.restore();
            }
        }

        ctx.restore(); // Restore clipping
        ctx.restore(); // Restore canvas context
    }

    renderQuizCard(ctx, obj) {
        ctx.save();
        ctx.shadowColor = 'rgba(0,0,0,0.12)';
        ctx.shadowBlur = 12;
        ctx.shadowOffsetY = 4;

        ctx.fillStyle = '#ffffff';
        ctx.strokeStyle = obj.isAnswered ? (obj.selectedIndex === obj.correctIndex ? '#22c55e' : '#ef4444') : (obj.strokeColor || '#3b82f6');
        ctx.lineWidth = 2;
        this.drawRoundedRect(ctx, obj.x, obj.y, obj.width, obj.height, 12);

        // Clip strictly inside the quiz card rounded rect
        ctx.save();
        ctx.beginPath();
        const r = Math.min(12, Math.abs(obj.width) / 2, Math.abs(obj.height) / 2);
        const x = obj.x, y = obj.y, w = obj.width, h = obj.height;
        ctx.moveTo(x + r, y);
        ctx.arcTo(x + w, y, x + w, y + h, r);
        ctx.arcTo(x + w, y + h, x, y + h, r);
        ctx.arcTo(x, y + h, x, y, r);
        ctx.arcTo(x, y, x + w, y, r);
        ctx.closePath();
        ctx.clip();

        // Header
        ctx.fillStyle = '#2563eb';
        ctx.font = `bold 11px ${this.fontFamily}`;
        ctx.textAlign = 'left';
        ctx.fillText('⚡ INTERACTIVE CLASSROOM QUIZ', obj.x + 16, obj.y + 22);

        // Reset/Retake button badge
        if (obj.isAnswered) {
            ctx.fillStyle = obj.selectedIndex === obj.correctIndex ? '#dcfce7' : '#fee2e2';
            ctx.strokeStyle = obj.selectedIndex === obj.correctIndex ? '#16a34a' : '#dc2626';
            ctx.lineWidth = 1;
            const statusTxt = obj.selectedIndex === obj.correctIndex ? '✓ Correct!' : '✗ Incorrect';
            ctx.font = `bold 10px ${this.fontFamily}`;
            const sw = ctx.measureText(statusTxt).width;
            this.drawRoundedRect(ctx, obj.x + obj.width - sw - 24, obj.y + 10, sw + 16, 20, 6);
            ctx.fill();
            ctx.stroke();
            ctx.fillStyle = obj.selectedIndex === obj.correctIndex ? '#15803d' : '#b91c1c';
            ctx.fillText(statusTxt, obj.x + obj.width - sw - 16, obj.y + 24);
        }

        // Question (with wrapping)
        ctx.fillStyle = '#0f172a';
        ctx.font = `bold 13px ${this.fontFamily}`;
        
        const qText = obj.question || '';
        const maxQW = Math.max(50, obj.width - 32);
        const words = qText.split(' ');
        let curLine = '';
        let qLines = [];
        for (let n = 0; n < words.length; n++) {
            const testLine = curLine ? `${curLine} ${words[n]}` : words[n];
            const metrics = ctx.measureText(testLine);
            if (metrics.width > maxQW && n > 0) {
                qLines.push(curLine.trim());
                curLine = words[n];
            } else {
                curLine = testLine;
            }
        }
        if (curLine) qLines.push(curLine.trim());
        if (qLines.length > 3) qLines = [qLines[0], qLines[1], qLines[2] + '...'];

        let qY = obj.y + 42;
        qLines.forEach(line => {
            ctx.fillText(line, obj.x + 16, qY);
            qY += 17;
        });

        // Options
        const optionH = 30;
        const optionGap = 6;
        const startY = Math.max(qY + 6, obj.y + 72);
        (obj.options || []).forEach((opt, idx) => {
            const optY = startY + idx * (optionH + optionGap);
            let btnBg = '#f8fafc';
            let borderCol = '#cbd5e1';
            let txtCol = '#334155';

            if (obj.isAnswered) {
                if (idx === obj.correctIndex) {
                    btnBg = '#dcfce7';
                    borderCol = '#22c55e';
                    txtCol = '#15803d';
                } else if (idx === obj.selectedIndex) {
                    btnBg = '#fee2e2';
                    borderCol = '#ef4444';
                    txtCol = '#b91c1c';
                }
            }

            ctx.fillStyle = btnBg;
            ctx.strokeStyle = borderCol;
            ctx.lineWidth = 1.2;
            this.drawRoundedRect(ctx, obj.x + 16, optY, obj.width - 32, optionH, 6);

            ctx.fillStyle = txtCol;
            ctx.font = `500 12px ${this.fontFamily}`;
            
            // Truncate option if too long
            let optStr = `${String.fromCharCode(65 + idx)}. ${opt}`;
            const maxOptW = obj.width - 48;
            if (ctx.measureText(optStr).width > maxOptW) {
                while (ctx.measureText(optStr + '...').width > maxOptW && optStr.length > 5) {
                    optStr = optStr.slice(0, -1);
                }
                optStr += '...';
            }
            ctx.fillText(optStr, obj.x + 24, optY + 19);
        });

        // Explanation / Note
        if (obj.isAnswered && obj.explanation) {
            ctx.fillStyle = '#64748b';
            ctx.font = `italic 11px ${this.fontFamily}`;
            let explStr = `💡 ${obj.explanation}`;
            const maxExplW = obj.width - 32;
            if (ctx.measureText(explStr).width > maxExplW) {
                while (ctx.measureText(explStr + '...').width > maxExplW && explStr.length > 10) {
                    explStr = explStr.slice(0, -1);
                }
                explStr += '...';
            }
            ctx.fillText(explStr, obj.x + 16, Math.min(obj.y + obj.height - 10, startY + 4 * (optionH + optionGap) + 16));
        }

        ctx.restore(); // Restore clip
        ctx.restore(); // Restore main
    }

    renderElementCard(ctx, obj) {
        ctx.save();
        ctx.shadowColor = 'rgba(0,0,0,0.1)';
        ctx.shadowBlur = 8;
        ctx.shadowOffsetY = 4;

        ctx.fillStyle = '#ffffff';
        ctx.strokeStyle = obj.color || '#6366f1';
        ctx.lineWidth = 2.5;
        this.drawRoundedRect(ctx, obj.x, obj.y, obj.width, obj.height, 10);

        // Clip to card boundaries
        ctx.save();
        ctx.beginPath();
        const r = Math.min(10, Math.abs(obj.width) / 2, Math.abs(obj.height) / 2);
        const x = obj.x, y = obj.y, w = obj.width, h = obj.height;
        ctx.moveTo(x + r, y);
        ctx.arcTo(x + w, y, x + w, y + h, r);
        ctx.arcTo(x + w, y + h, x, y + h, r);
        ctx.arcTo(x, y + h, x, y, r);
        ctx.arcTo(x, y, x + w, y, r);
        ctx.closePath();
        ctx.clip();

        ctx.fillStyle = '#64748b';
        ctx.font = `14px ${this.fontFamily}`;
        ctx.fillText(`${obj.number}`, obj.x + 12, obj.y + 24);
        ctx.fillText(`${obj.mass}`, obj.x + obj.width - 48, obj.y + 24);

        ctx.fillStyle = obj.color || '#6366f1';
        ctx.font = `bold 44px ${this.fontFamily}`;
        ctx.textAlign = 'center';
        ctx.fillText(obj.symbol, obj.x + obj.width / 2, obj.y + 90);

        ctx.fillStyle = '#1e293b';
        ctx.font = `bold 14px ${this.fontFamily}`;
        ctx.fillText(obj.name, obj.x + obj.width / 2, obj.y + 125);

        ctx.fillStyle = '#64748b';
        ctx.font = `11px ${this.fontFamily}`;
        ctx.fillText(obj.group.toUpperCase(), obj.x + obj.width / 2, obj.y + 148);

        ctx.restore(); // Restore clip
        ctx.restore(); // Restore main
    }

    renderLatexCard(ctx, obj) {
        ctx.save();
        ctx.shadowColor = 'rgba(0,0,0,0.1)';
        ctx.shadowBlur = 10;
        ctx.shadowOffsetY = 4;

        ctx.fillStyle = '#ffffff';
        ctx.strokeStyle = '#6366f1';
        ctx.lineWidth = 2;
        this.drawRoundedRect(ctx, obj.x, obj.y, obj.width, obj.height, 10);

        // Clip to rounded rect
        ctx.save();
        ctx.beginPath();
        const r = Math.min(10, Math.abs(obj.width) / 2, Math.abs(obj.height) / 2);
        const x = obj.x, y = obj.y, w = obj.width, h = obj.height;
        ctx.moveTo(x + r, y);
        ctx.arcTo(x + w, y, x + w, y + h, r);
        ctx.arcTo(x + w, y + h, x, y + h, r);
        ctx.arcTo(x, y + h, x, y, r);
        ctx.arcTo(x, y, x + w, y, r);
        ctx.closePath();
        ctx.clip();

        ctx.fillStyle = '#4f46e5';
        ctx.font = `bold 12px ${this.fontFamily}`;
        ctx.fillText(`📐 ${(obj.title || 'FORMULA').toUpperCase()}`, obj.x + 15, obj.y + 24);

        // Auto-scale latex font to fit within width
        let latexFont = 18;
        ctx.font = `${latexFont}px "KaTeX_Main", "Times New Roman", serif`;
        const maxLatexW = Math.max(30, obj.width - 32);
        while (ctx.measureText(obj.latex || '').width > maxLatexW && latexFont > 11) {
            latexFont -= 1;
            ctx.font = `${latexFont}px "KaTeX_Main", "Times New Roman", serif`;
        }

        ctx.fillStyle = '#0f172a';
        ctx.fillText(obj.latex, obj.x + 16, obj.y + Math.min(obj.height - 20, 75));

        ctx.restore(); // Restore clip
        ctx.restore(); // Restore main
    }

    renderLensBox(ctx, obj) {
        const rx = obj.width >= 0 ? obj.x : obj.x + obj.width;
        const ry = obj.height >= 0 ? obj.y : obj.y + obj.height;
        const rw = Math.max(30, Math.abs(obj.width || 280));
        const rh = Math.max(30, Math.abs(obj.height || 200));

        ctx.save();
        // 1. Semi-transparent scanner glass
        ctx.fillStyle = 'rgba(99, 102, 241, 0.05)';
        ctx.fillRect(rx, ry, rw, rh);

        // 2. Dashed Scanner Border
        ctx.strokeStyle = 'rgba(99, 102, 241, 0.6)';
        ctx.lineWidth = 1.5;
        ctx.setLineDash([6, 4]);
        ctx.strokeRect(rx, ry, rw, rh);
        ctx.setLineDash([]);

        // 3. 4 Google Colors Corner Brackets [ ]
        const bracketLen = Math.min(24, Math.floor(rw / 4), Math.floor(rh / 4));
        const bracketWidth = 3.5;
        const colors = ['#4285F4', '#EA4335', '#FBBC05', '#34A853']; // Google Blue, Red, Yellow, Green

        // NW (Blue)
        ctx.strokeStyle = colors[0]; ctx.lineWidth = bracketWidth;
        ctx.beginPath();
        ctx.moveTo(rx, ry + bracketLen); ctx.lineTo(rx, ry); ctx.lineTo(rx + bracketLen, ry);
        ctx.stroke();

        // NE (Red)
        ctx.strokeStyle = colors[1];
        ctx.beginPath();
        ctx.moveTo(rx + rw - bracketLen, ry); ctx.lineTo(rx + rw, ry); ctx.lineTo(rx + rw, ry + bracketLen);
        ctx.stroke();

        // SE (Yellow)
        ctx.strokeStyle = colors[2];
        ctx.beginPath();
        ctx.moveTo(rx + rw, ry + rh - bracketLen); ctx.lineTo(rx + rw, ry + rh); ctx.lineTo(rx + rw - bracketLen, ry + rh);
        ctx.stroke();

        // SW (Green)
        ctx.strokeStyle = colors[3];
        ctx.beginPath();
        ctx.moveTo(rx + bracketLen, ry + rh); ctx.lineTo(rx, ry + rh); ctx.lineTo(rx, ry + rh - bracketLen);
        ctx.stroke();

        // 4. Animated Laser Scanner Beam
        const beamY = ry + ((Math.sin(Date.now() / 400) + 1) / 2) * rh;
        const grad = ctx.createLinearGradient(rx, beamY, rx + rw, beamY);
        grad.addColorStop(0, 'rgba(66, 133, 244, 0)');
        grad.addColorStop(0.5, 'rgba(66, 133, 244, 0.7)');
        grad.addColorStop(1, 'rgba(52, 168, 83, 0)');
        ctx.strokeStyle = grad;
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        ctx.moveTo(rx, beamY); ctx.lineTo(rx + rw, beamY);
        ctx.stroke();

        // 5. Header Badge Pill
        const headerText = '🔍 Google Lens AI Scanner';
        ctx.font = 'bold 11px Inter, sans-serif';
        const hw = ctx.measureText(headerText).width + 20;
        ctx.fillStyle = '#1e293b';
        ctx.shadowColor = 'rgba(0,0,0,0.2)';
        ctx.shadowBlur = 6;
        this.drawRoundedRect(ctx, rx, ry - 24, hw, 20, 6);
        ctx.shadowColor = 'transparent';
        ctx.fillStyle = '#ffffff';
        ctx.fillText(headerText, rx + 10, ry - 10);

        // Status Badge
        const statusText = obj.isScanning ? '⚡ SCANNING...' : '✓ LIVE SCANNED';
        ctx.font = 'bold 9px Inter, sans-serif';
        const sw = ctx.measureText(statusText).width + 12;
        ctx.fillStyle = obj.isScanning ? '#f59e0b' : '#10b981';
        this.drawRoundedRect(ctx, rx + hw + 4, ry - 24, sw, 20, 6);
        ctx.fillStyle = '#ffffff';
        ctx.fillText(statusText, rx + hw + 10, ry - 10);

        // 6. Render Companion Result & Question Box
        this.renderLensResultCard(ctx, obj, rx, ry, rw, rh);

        ctx.restore();
    }

    renderLensResultCard(ctx, obj, rx, ry, rw, rh) {
        // Place adjacent to the right, or below if near boundary
        const cardX = rx + rw + 14;
        const cardY = ry;
        const cardW = 340;
        const cardH = Math.max(260, Math.min(460, 100 + (obj.result ? (obj.result.steps ? obj.result.steps.length * 20 : 60) : 80)));

        obj._cardBounds = { x: cardX, y: cardY, w: cardW, h: cardH };
        obj._actionButtons = [];

        ctx.save();
        ctx.shadowColor = 'rgba(0, 0, 0, 0.15)';
        ctx.shadowBlur = 14;
        ctx.shadowOffsetY = 6;

        ctx.fillStyle = '#ffffff';
        ctx.strokeStyle = '#4f46e5';
        ctx.lineWidth = 2;
        this.drawRoundedRect(ctx, cardX, cardY, cardW, cardH, 12);

        // Clip strictly inside card
        ctx.save();
        ctx.beginPath();
        const r = 12;
        ctx.moveTo(cardX + r, cardY);
        ctx.arcTo(cardX + cardW, cardY, cardX + cardW, cardY + cardH, r);
        ctx.arcTo(cardX + cardW, cardY + cardH, cardX, cardY + cardH, r);
        ctx.arcTo(cardX, cardY + cardH, cardX, cardY, r);
        ctx.arcTo(cardX, cardY, cardX + cardW, r);
        ctx.closePath();
        ctx.clip();

        // Card Top Bar Header
        ctx.fillStyle = '#4f46e5';
        ctx.font = 'bold 12px Inter, sans-serif';
        ctx.fillText('🧠 GOOGLE LENS MEANING & EXPLANATION', cardX + 14, cardY + 22);

        // Close button (✕)
        const closeBtnW = 20, closeBtnH = 20;
        const closeX = cardX + cardW - closeBtnW - 10;
        const closeY = cardY + 8;
        ctx.fillStyle = '#f1f5f9';
        ctx.strokeStyle = '#cbd5e1';
        ctx.lineWidth = 1;
        this.drawRoundedRect(ctx, closeX, closeY, closeBtnW, closeBtnH, 4);
        ctx.fillStyle = '#64748b';
        ctx.font = 'bold 12px Inter, sans-serif';
        ctx.fillText('✕', closeX + 5.5, closeY + 14.5);
        obj._actionButtons.push({ action: 'close', x: closeX, y: closeY, w: closeBtnW, h: closeBtnH });

        let curY = cardY + 44;

        if (obj.isScanning) {
            ctx.fillStyle = '#6366f1';
            ctx.font = 'italic 12px Inter, sans-serif';
            ctx.fillText('🔍 Scanning enclosed area with Google Lens AI...', cardX + 14, curY);
            curY += 24;
            ctx.fillStyle = '#64748b';
            ctx.font = '11px Inter, sans-serif';
            ctx.fillText('Formulating step-by-step verified solution...', cardX + 14, curY);
        } else if (obj.result) {
            // Title
            ctx.fillStyle = '#0f172a';
            ctx.font = 'bold 13px Inter, sans-serif';
            ctx.fillText(obj.result.title || 'Area Analysis', cardX + 14, curY);
            curY += 18;

            // Summary
            ctx.fillStyle = '#334155';
            ctx.font = '11.5px Inter, sans-serif';
            const sumText = obj.result.summary || '';
            const maxW = cardW - 28;
            const words = sumText.split(' ');
            let line = '';
            for (let w of words) {
                const test = line ? `${line} ${w}` : w;
                if (ctx.measureText(test).width > maxW) {
                    ctx.fillText(line, cardX + 14, curY);
                    curY += 16;
                    line = w;
                } else {
                    line = test;
                }
            }
            if (line) {
                ctx.fillText(line, cardX + 14, curY);
                curY += 18;
            }

            // Steps
            if (obj.result.steps && obj.result.steps.length > 0) {
                ctx.fillStyle = '#1e293b';
                ctx.font = '11px Inter, sans-serif';
                obj.result.steps.slice(0, 4).forEach(s => {
                    let sStr = s;
                    if (ctx.measureText(sStr).width > maxW) sStr = sStr.slice(0, 52) + '...';
                    ctx.fillText(sStr, cardX + 14, curY);
                    curY += 16;
                });
            }

            curY += 6;

            // 1-Click Action Buttons: Plot Graph / Chemistry / Biology / Diagram
            const btnH = 24;
            let btnX = cardX + 14;

            if (obj.result.isMath || obj.result.formula) {
                const bw = 90;
                ctx.fillStyle = '#4f46e5';
                this.drawRoundedRect(ctx, btnX, curY, bw, btnH, 6);
                ctx.fillStyle = '#ffffff';
                ctx.font = 'bold 10px Inter, sans-serif';
                ctx.fillText('📈 Plot Graph', btnX + 10, curY + 16);
                obj._actionButtons.push({ action: 'plot_graph', x: btnX, y: curY, w: bw, h: btnH });
                btnX += bw + 6;
            }

            if (obj.result.isChemistry) {
                const bw = 95;
                ctx.fillStyle = '#059669';
                this.drawRoundedRect(ctx, btnX, curY, bw, btnH, 6);
                ctx.fillStyle = '#ffffff';
                ctx.font = 'bold 10px Inter, sans-serif';
                ctx.fillText('🧪 Insert Chem', btnX + 8, curY + 16);
                obj._actionButtons.push({ action: 'insert_chem', x: btnX, y: curY, w: bw, h: btnH });
                btnX += bw + 6;
            }

            if (obj.result.isBiology) {
                const bw = 90;
                ctx.fillStyle = '#10b981';
                this.drawRoundedRect(ctx, btnX, curY, bw, btnH, 6);
                ctx.fillStyle = '#ffffff';
                ctx.font = 'bold 10px Inter, sans-serif';
                ctx.fillText('🧬 Insert Bio', btnX + 8, curY + 16);
                obj._actionButtons.push({ action: 'insert_bio', x: btnX, y: curY, w: bw, h: btnH });
                btnX += bw + 6;
            }

            if (obj.result.diagram) {
                const bw = 95;
                ctx.fillStyle = '#0284c7';
                this.drawRoundedRect(ctx, btnX, curY, bw, btnH, 6);
                ctx.fillStyle = '#ffffff';
                ctx.font = 'bold 10px Inter, sans-serif';
                ctx.fillText('🔗 Diagram', btnX + 8, curY + 16);
                obj._actionButtons.push({ action: 'open_diagram', x: btnX, y: curY, w: bw, h: btnH });
                btnX += bw + 6;
            }

            curY += btnH + 8;

            // Attached Question Input Prompt Bar (Click to Type & Ask)
            const promptBarW = cardW - 28;
            const promptBarH = 26;
            ctx.fillStyle = '#f8fafc';
            ctx.strokeStyle = '#c7d2fe';
            ctx.lineWidth = 1.2;
            this.drawRoundedRect(ctx, cardX + 14, curY, promptBarW, promptBarH, 6);

            ctx.fillStyle = obj.query ? '#1e293b' : '#64748b';
            ctx.font = '10px Inter, sans-serif';
            const promptDisplay = obj.query ? `💬 "${obj.query.slice(0, 36)}"` : '💬 Ask AI any question about this area (Click)...';
            ctx.fillText(promptDisplay, cardX + 22, curY + 17);

            obj._actionButtons.push({ action: 'ask_question', x: cardX + 14, y: curY, w: promptBarW, h: promptBarH });

            curY += promptBarH + 8;

            // Bottom Actions: Place as Card, Re-Scan
            const actH = 24;
            // Insert Card
            ctx.fillStyle = '#e0e7ff';
            ctx.strokeStyle = '#c7d2fe';
            this.drawRoundedRect(ctx, cardX + 14, curY, 130, actH, 6);
            ctx.fillStyle = '#3730a3';
            ctx.font = 'bold 10px Inter, sans-serif';
            ctx.fillText('📋 Place as Card', cardX + 20, curY + 16);
            obj._actionButtons.push({ action: 'insert_solution', x: cardX + 14, y: curY, w: 130, h: actH });

            // Re-Scan
            ctx.fillStyle = '#f1f5f9';
            ctx.strokeStyle = '#e2e8f0';
            this.drawRoundedRect(ctx, cardX + 152, curY, 90, actH, 6);
            ctx.fillStyle = '#475569';
            ctx.font = 'bold 10px Inter, sans-serif';
            ctx.fillText('🔄 Re-Scan', cardX + 168, curY + 16);
            obj._actionButtons.push({ action: 'rescan', x: cardX + 152, y: curY, w: 90, h: actH });
        }

        ctx.restore(); // Restore clip
        ctx.restore(); // Restore card
    }

    renderMarqueeBox(ctx, box) {
        const sx = Math.min(box.startX, box.currentX);
        const sy = Math.min(box.startY, box.currentY);
        const sw = Math.abs(box.currentX - box.startX);
        const sh = Math.abs(box.currentY - box.startY);
        if (sw < 2 && sh < 2) return;

        ctx.save();
        ctx.fillStyle = 'rgba(79, 70, 229, 0.12)';
        ctx.strokeStyle = '#4f46e5';
        ctx.lineWidth = 1.5;
        ctx.setLineDash([5, 4]);
        ctx.fillRect(sx, sy, sw, sh);
        ctx.strokeRect(sx, sy, sw, sh);
        ctx.restore();
    }

    renderSelection(ctx, obj) {
        ctx.save();
        const bounds = this.getObjectBounds(obj);
        if (!bounds) { ctx.restore(); return; }

        const padding = 8;
        const cx = obj.x + (obj.width || bounds.width) / 2;
        const cy = obj.y + (obj.height || bounds.height) / 2;
        const rot = obj.rotation || 0;

        ctx.save();
        if (rot) {
            ctx.translate(cx, cy);
            ctx.rotate(rot);
            ctx.translate(-cx, -cy);
        }

        if (this.textTransferActive && this.longPressSourceObj === obj) {
            ctx.strokeStyle = '#10b981';
            ctx.shadowColor = 'rgba(16, 185, 129, 0.6)';
            ctx.shadowBlur = 10;
        } else {
            ctx.strokeStyle = '#4f46e5';
        }
        ctx.lineWidth = 1.8;
        ctx.setLineDash([5, 4]);
        ctx.strokeRect(bounds.minX - padding, bounds.minY - padding, bounds.width + padding * 2, bounds.height + padding * 2);

        // Draw Rotation Stem & Handle
        const midX = (bounds.minX + bounds.maxX) / 2;
        const topY = bounds.minY - padding;
        const rotY = bounds.minY - padding - (24 / this.scale);

        ctx.setLineDash([]);
        ctx.strokeStyle = '#6366f1';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(midX, topY);
        ctx.lineTo(midX, rotY);
        ctx.stroke();

        ctx.shadowColor = 'rgba(99, 102, 241, 0.5)';
        ctx.shadowBlur = 8;
        ctx.fillStyle = '#ffffff';
        ctx.strokeStyle = '#4338ca';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(midX, rotY, 6.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();

        ctx.shadowColor = 'transparent';
        ctx.strokeStyle = '#4338ca';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(midX, rotY, 3.2, -Math.PI * 0.7, Math.PI * 0.7);
        ctx.stroke();

        // If rotating, show live angle tooltip badge
        if (this.isRotatingObject && this.currentRotationAngleDeg !== null && this.currentRotationAngleDeg !== undefined) {
            const badgeTxt = `${this.currentRotationAngleDeg}°`;
            ctx.font = 'bold 11px Inter, sans-serif';
            const bW = ctx.measureText(badgeTxt).width + 12;
            const bH = 18;
            ctx.fillStyle = '#1e1b4b';
            ctx.strokeStyle = '#6366f1';
            ctx.lineWidth = 1;
            this.drawRoundedRect(ctx, midX - bW / 2, rotY - bH - 6, bW, bH, 4);
            ctx.fill();
            ctx.stroke();
            ctx.fillStyle = '#ffffff';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(badgeTxt, midX, rotY - bH / 2 - 6);
        }

        // Draw 8 Corner and Edge Anchor Handles (in local frame)
        const unrotHandles = [
            { x: bounds.minX - padding, y: bounds.minY - padding },
            { x: bounds.maxX + padding, y: bounds.minY - padding },
            { x: bounds.minX - padding, y: bounds.maxY + padding },
            { x: bounds.maxX + padding, y: bounds.maxY + padding },
            { x: midX, y: bounds.minY - padding },
            { x: midX, y: bounds.maxY + padding },
            { x: bounds.minX - padding, y: (bounds.minY + bounds.maxY) / 2 },
            { x: bounds.maxX + padding, y: (bounds.minY + bounds.maxY) / 2 }
        ];

        unrotHandles.forEach(h => {
            ctx.shadowColor = 'rgba(79, 70, 229, 0.4)';
            ctx.shadowBlur = 6;
            ctx.fillStyle = '#ffffff';
            ctx.strokeStyle = '#4338ca';
            ctx.lineWidth = 2.5;

            ctx.beginPath();
            ctx.arc(h.x, h.y, 5.5, 0, Math.PI * 2);
            ctx.fill();
            ctx.stroke();
        });

        ctx.restore();
        ctx.restore();
    }

    renderMultiSelection(ctx, objects) {
        ctx.save();
        const compound = this.getCompoundBounds(objects);
        if (!compound) { ctx.restore(); return; }

        // 1. Render subtle outline for each individual object inside the group
        ctx.strokeStyle = 'rgba(99, 102, 241, 0.45)';
        ctx.lineWidth = 1.2;
        ctx.setLineDash([3, 3]);
        objects.forEach(obj => {
            const b = this.getObjectBounds(obj);
            if (b) {
                ctx.strokeRect(b.minX - 4, b.minY - 4, b.width + 8, b.height + 8);
            }
        });

        // 2. Render main compound selection box
        const pad = 10;
        const boxX = compound.minX - pad;
        const boxY = compound.minY - pad;
        const boxW = compound.width + pad * 2;
        const boxH = compound.height + pad * 2;

        ctx.strokeStyle = '#4f46e5';
        ctx.lineWidth = 1.8;
        ctx.setLineDash([6, 4]);
        ctx.fillStyle = 'rgba(79, 70, 229, 0.04)';
        ctx.fillRect(boxX, boxY, boxW, boxH);
        ctx.strokeRect(boxX, boxY, boxW, boxH);

        // Draw Rotation Stem & Handle on Compound Box
        const midX = (compound.minX + compound.maxX) / 2;
        const topY = compound.minY - pad;
        const rotY = compound.minY - pad - (24 / this.scale);

        ctx.strokeStyle = '#6366f1';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(midX, topY);
        ctx.lineTo(midX, rotY);
        ctx.stroke();

        ctx.shadowColor = 'rgba(99, 102, 241, 0.5)';
        ctx.shadowBlur = 8;
        ctx.fillStyle = '#ffffff';
        ctx.strokeStyle = '#4338ca';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(midX, rotY, 6.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();

        ctx.shadowColor = 'transparent';
        ctx.strokeStyle = '#4338ca';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(midX, rotY, 3.2, -Math.PI * 0.7, Math.PI * 0.7);
        ctx.stroke();

        // 3. Render 8 Corner and Edge Handles
        ctx.setLineDash([]);
        const handles = this.getSelectionHandles();
        handles.forEach(h => {
            if (h.type === 'rotate') return;
            ctx.shadowColor = 'rgba(79, 70, 229, 0.4)';
            ctx.shadowBlur = 6;
            ctx.fillStyle = '#ffffff';
            ctx.strokeStyle = '#4338ca';
            ctx.lineWidth = 2.5;

            ctx.beginPath();
            ctx.arc(h.x, h.y, 5.5, 0, Math.PI * 2);
            ctx.fill();
            ctx.stroke();
        });

        // 4. Floating Badge Indicator
        const badgeText = `✨ ${objects.length} items selected (Drag to shift)`;
        ctx.font = 'bold 11px Inter, sans-serif';
        const txtWidth = ctx.measureText(badgeText).width;
        const badgeW = txtWidth + 18;
        const badgeH = 22;
        const badgeX = boxX;
        const badgeY = boxY - badgeH - 6;

        ctx.shadowColor = 'rgba(0, 0, 0, 0.2)';
        ctx.shadowBlur = 8;
        ctx.fillStyle = '#1e1b4b';
        ctx.strokeStyle = '#6366f1';
        ctx.lineWidth = 1.2;
        this.drawRoundedRect(ctx, badgeX, badgeY, badgeW, badgeH, 6);
        ctx.fill();
        ctx.stroke();

        ctx.shadowColor = 'transparent';
        ctx.fillStyle = '#ffffff';
        ctx.textBaseline = 'middle';
        ctx.fillText(badgeText, badgeX + 9, badgeY + badgeH / 2);

        ctx.restore();
    }

    // --- Overlay / Spotlight & Laser Animation ---
    renderOverlay() {
        if (!this.overlayCtx) return;
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        const w = this.overlayCanvas.width / dpr;
        const h = this.overlayCanvas.height / dpr;

        if (!this.spotlightMode && this.laserTrail.length === 0) {
            if (this._overlayHasContent) {
                this.overlayCtx.clearRect(0, 0, w, h);
                this._overlayHasContent = false;
            }
            return;
        }

        this._overlayHasContent = true;
        this.overlayCtx.clearRect(0, 0, w, h);

        if (this.spotlightMode) {
            this.overlayCtx.save();
            this.overlayCtx.fillStyle = 'rgba(0, 0, 0, 0.75)';
            this.overlayCtx.fillRect(0, 0, w, h);

            this.overlayCtx.globalCompositeOperation = 'destination-out';
            const grad = this.overlayCtx.createRadialGradient(
                this.screenMousePos.x, this.screenMousePos.y, this.spotlightRadius * 0.7,
                this.screenMousePos.x, this.screenMousePos.y, this.spotlightRadius
            );
            grad.addColorStop(0, 'rgba(0, 0, 0, 1)');
            grad.addColorStop(1, 'rgba(0, 0, 0, 0)');

            this.overlayCtx.fillStyle = grad;
            this.overlayCtx.beginPath();
            this.overlayCtx.arc(this.screenMousePos.x, this.screenMousePos.y, this.spotlightRadius, 0, Math.PI * 2);
            this.overlayCtx.fill();
            this.overlayCtx.restore();
        }

        const now = Date.now();
        this.laserTrail = this.laserTrail.filter(pt => (now - pt.time) < 900);

        if (this.laserTrail.length > 1) {
            this.overlayCtx.save();
            this.overlayCtx.lineCap = 'round';
            this.overlayCtx.lineJoin = 'round';

            for (let i = 0; i < this.laserTrail.length - 1; i++) {
                const pt1 = this.laserTrail[i];
                const pt2 = this.laserTrail[i + 1];
                const age = (now - pt1.time) / 900;
                const alpha = 1 - age;

                this.overlayCtx.strokeStyle = `rgba(239, 68, 68, ${alpha})`;
                this.overlayCtx.shadowColor = '#ef4444';
                this.overlayCtx.shadowBlur = 12 * (1 - age);
                this.overlayCtx.lineWidth = 6 * (1 - age * 0.5);

                this.overlayCtx.beginPath();
                this.overlayCtx.moveTo(pt1.x, pt1.y);
                this.overlayCtx.lineTo(pt2.x, pt2.y);
                this.overlayCtx.stroke();
            }
            this.overlayCtx.restore();
        }
    }

    // --- Calculate Full Workarea Bounding Box for High-Res Export ---
    getSlideBoundingBox(slide) {
        const objs = slide ? slide.objects : this.objects;
        if (!objs || objs.length === 0) {
            return { minX: 0, minY: 0, maxX: 1280, maxY: 720, width: 1280, height: 720 };
        }

        let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;

        objs.forEach(obj => {
            if (obj.points && obj.points.length > 0) {
                obj.points.forEach(p => {
                    minX = Math.min(minX, p.x);
                    maxX = Math.max(maxX, p.x);
                    minY = Math.min(minY, p.y);
                    maxY = Math.max(maxY, p.y);
                });
            } else if (obj.x1 !== undefined && obj.x2 !== undefined) {
                minX = Math.min(minX, obj.x1, obj.x2);
                maxX = Math.max(maxX, obj.x1, obj.x2);
                minY = Math.min(minY, obj.y1, obj.y2);
                maxY = Math.max(maxY, obj.y1, obj.y2);
                if (obj.cx !== undefined && obj.cy !== undefined) {
                    minX = Math.min(minX, obj.cx);
                    maxX = Math.max(maxX, obj.cx);
                    minY = Math.min(minY, obj.cy);
                    maxY = Math.max(maxY, obj.cy);
                }
            } else if (obj.type === 'ellipse') {
                const rx = obj.radiusX || Math.abs(obj.width || 120) / 2 || 60;
                const ry = obj.radiusY || Math.abs(obj.height || 120) / 2 || 60;
                const cx = obj.radiusX ? obj.x : obj.x + (obj.width || 0) / 2;
                const cy = obj.radiusY ? obj.y : obj.y + (obj.height || 0) / 2;
                minX = Math.min(minX, cx - rx);
                maxX = Math.max(maxX, cx + rx);
                minY = Math.min(minY, cy - ry);
                maxY = Math.max(maxY, cy + ry);
            } else if (obj.type === 'triangle' && obj.x1 !== undefined) {
                minX = Math.min(minX, obj.x1, obj.x2, obj.x3);
                maxX = Math.max(maxX, obj.x1, obj.x2, obj.x3);
                minY = Math.min(minY, obj.y1, obj.y2, obj.y3);
                maxY = Math.max(maxY, obj.y1, obj.y2, obj.y3);
            } else if (obj.type === 'text') {
                const lines = (obj.text || '').split('\n');
                const lineCount = lines.length;
                const maxLineLen = Math.max(...lines.map(l => l.length), 10);
                const textW = Math.max(150, maxLineLen * ((obj.fontSize || 20) * 0.65));
                const textH = lineCount * ((obj.fontSize || 20) * 1.5);
                minX = Math.min(minX, obj.x);
                maxX = Math.max(maxX, obj.x + textW);
                minY = Math.min(minY, obj.y - (obj.fontSize || 20));
                maxY = Math.max(maxY, obj.y + textH);
            } else if (obj.x !== undefined && obj.y !== undefined) {
                const w = Math.abs(obj.width || 200);
                const h = Math.abs(obj.height || 80);
                minX = Math.min(minX, obj.x);
                maxX = Math.max(maxX, obj.x + w);
                minY = Math.min(minY, obj.y);
                maxY = Math.max(maxY, obj.y + h);
            }
        });

        if (!isFinite(minX) || !isFinite(minY) || !isFinite(maxX) || !isFinite(maxY)) {
            return { minX: 0, minY: 0, maxX: 1280, maxY: 720, width: 1280, height: 720 };
        }

        // Add generous margins around all elements
        const margin = 70;
        minX = Math.floor(minX - margin);
        minY = Math.floor(minY - margin);
        maxX = Math.ceil(maxX + margin);
        maxY = Math.ceil(maxY + margin);

        const targetW = Math.max(1280, maxX - minX);
        const targetH = Math.max(720, maxY - minY);
        if (maxX - minX < targetW) {
            const diff = targetW - (maxX - minX);
            minX -= Math.floor(diff / 2);
            maxX += Math.ceil(diff / 2);
        }
        if (maxY - minY < targetH) {
            const diff = targetH - (maxY - minY);
            minY -= Math.floor(diff / 2);
            maxY += Math.ceil(diff / 2);
        }

        const width = Math.max(960, maxX - minX);
        const height = Math.max(540, maxY - minY);

        return { minX, minY, maxX, maxY, width, height };
    }

    // --- High-Resolution Full Workarea Image Export ---
    async exportToImage(format = 'png', slideIndex = null) {
        try {
            const slide = (slideIndex !== null && this.slides[slideIndex]) ? this.slides[slideIndex] : (this.currentSlide || this.slides[0]);
            if (!slide) {
                this.showToast('⚠️ No active page found to export.');
                return;
            }

            // Ensure slide objects are translated if translation toggle is ON
            if (this.isTranslationActive && window.languageTranslator && Array.isArray(slide.objects)) {
                await window.languageTranslator.translateObjects(slide.objects, this.currentLanguage);
            }

            const bbox = this.getSlideBoundingBox(slide);

            // 2x Retina Resolution
            const dpr = 2.0;
            const offCanvas = document.createElement('canvas');
            offCanvas.width = Math.max(200, Math.round(bbox.width * dpr));
            offCanvas.height = Math.max(200, Math.round(bbox.height * dpr));
            const offCtx = offCanvas.getContext('2d');
            if (!offCtx) {
                this.showToast('⚠️ Failed to initialize export canvas context.');
                return;
            }
            offCtx.scale(dpr, dpr);

            // Background Theme & Custom Slide Background
            let bgColor = this.getSlideBgColor(slide);
            const isDark = this.isDarkColor(bgColor);

            offCtx.fillStyle = bgColor;
            offCtx.fillRect(0, 0, bbox.width, bbox.height);

            // Grid lines
            if (this.showGrid) {
                let gridColor = isDark ? 'rgba(255, 255, 255, 0.1)' : '#e2e8f0';
                if (this.theme === 'blackboard') gridColor = 'rgba(255, 255, 255, 0.08)';
                else if (this.theme === 'blueprint') gridColor = 'rgba(255, 255, 255, 0.15)';

                offCtx.save();
                offCtx.strokeStyle = gridColor;
                offCtx.lineWidth = 1;
                const step = this.gridSize || 25;
                offCtx.beginPath();
                for (let x = 0; x < bbox.width; x += step) {
                    offCtx.moveTo(x, 0); offCtx.lineTo(x, bbox.height);
                }
                for (let y = 0; y < bbox.height; y += step) {
                    offCtx.moveTo(0, y); offCtx.lineTo(bbox.width, y);
                }
                offCtx.stroke();
                offCtx.restore();
            }

            // Align camera to full workarea
            offCtx.translate(-bbox.minX, -bbox.minY);

            // Render every object on the slide with static frame fallback
            this._isExporting = true;
            if (Array.isArray(slide.objects)) {
                slide.objects.forEach(obj => {
                    try {
                        this.renderObject(offCtx, obj);
                    } catch (renderErr) {
                        console.warn('Export render object error:', renderErr, obj);
                    }
                });
            }
            this._isExporting = false;

            const isJpeg = (format === 'jpeg' || format === 'jpg');
            const mimeType = isJpeg ? 'image/jpeg' : 'image/png';
            const fileExt = isJpeg ? 'jpg' : 'png';
            const rawTitle = slide.title ? String(slide.title).replace(/[^a-zA-Z0-9_\-]/g, '_') : 'Slide';
            const filename = `whiteboard-${rawTitle}-${Date.now()}.${fileExt}`;

            const triggerDownload = (downloadUrl) => {
                const a = document.createElement('a');
                a.href = downloadUrl;
                a.download = filename;
                document.body.appendChild(a);
                a.click();
                setTimeout(() => {
                    if (document.body.contains(a)) document.body.removeChild(a);
                    if (downloadUrl.startsWith('blob:')) {
                        URL.revokeObjectURL(downloadUrl);
                    }
                }, 300);
                this.showToast(`✅ Exported ${fileExt.toUpperCase()} image successfully!`);
                window.soundManager?.playPop?.();
            };

            if (offCanvas.toBlob) {
                offCanvas.toBlob((blob) => {
                    if (blob) {
                        const blobUrl = URL.createObjectURL(blob);
                        triggerDownload(blobUrl);
                    } else {
                        const dataUrl = offCanvas.toDataURL(mimeType, 0.95);
                        triggerDownload(dataUrl);
                    }
                }, mimeType, 0.95);
            } else {
                const dataUrl = offCanvas.toDataURL(mimeType, 0.95);
                triggerDownload(dataUrl);
            }
        } catch (err) {
            this._isExporting = false;
            console.error('Error in exportToImage:', err);
            this.showToast('⚠️ Export image failed. Please check canvas content.');
        }
    }

    // --- Export All Pages as Standalone Interactive HTML Document ---
    async exportAllPagesToHTML() {
        try {
            this._isExporting = true;
            const targetSlides = (Array.isArray(this.slides) && this.slides.length > 0) ? this.slides : [this.currentSlide];

            // Ensure all slides are translated if translation toggle is ON
            if (this.isTranslationActive && window.languageTranslator) {
                for (let s of targetSlides) {
                    await window.languageTranslator.translateObjects(s.objects, this.currentLanguage);
                }
            }

            const slideData = targetSlides.map((slide, idx) => {
                const bbox = this.getSlideBoundingBox(slide);
                const dpr = 2.0;
                const offCanvas = document.createElement('canvas');
                offCanvas.width = Math.max(200, Math.round(bbox.width * dpr));
                offCanvas.height = Math.max(200, Math.round(bbox.height * dpr));
                const offCtx = offCanvas.getContext('2d');
                if (offCtx) {
                    offCtx.scale(dpr, dpr);

                    let bgColor = this.getSlideBgColor(slide);
                    const isDark = this.isDarkColor(bgColor);

                    offCtx.fillStyle = bgColor;
                    offCtx.fillRect(0, 0, bbox.width, bbox.height);

                    if (this.showGrid) {
                        let gridColor = isDark ? 'rgba(255, 255, 255, 0.1)' : '#e2e8f0';
                        if (this.theme === 'blackboard') gridColor = 'rgba(255, 255, 255, 0.08)';
                        else if (this.theme === 'blueprint') gridColor = 'rgba(255, 255, 255, 0.15)';

                        offCtx.save();
                        offCtx.strokeStyle = gridColor;
                        offCtx.lineWidth = 1;
                        const step = this.gridSize || 25;
                        offCtx.beginPath();
                        for (let x = 0; x < bbox.width; x += step) {
                            offCtx.moveTo(x, 0); offCtx.lineTo(x, bbox.height);
                        }
                        for (let y = 0; y < bbox.height; y += step) {
                            offCtx.moveTo(0, y); offCtx.lineTo(bbox.width, y);
                        }
                        offCtx.stroke();
                        offCtx.restore();
                    }

                    offCtx.translate(-bbox.minX, -bbox.minY);
                    if (Array.isArray(slide.objects)) {
                        slide.objects.forEach(obj => {
                            try {
                                this.renderObject(offCtx, obj);
                            } catch (renderErr) {
                                console.warn('HTML export object render error:', renderErr);
                            }
                        });
                    }
                }

                let imgData = '';
                try {
                    imgData = offCanvas.toDataURL('image/png', 0.95);
                } catch (dataErr) {
                    console.warn('Canvas toDataURL fallback:', dataErr);
                    imgData = offCanvas.toDataURL();
                }

                return {
                    title: (slide && slide.title) ? slide.title : `Slide ${idx + 1}`,
                    img: imgData,
                    objectCount: (slide && slide.objects) ? slide.objects.length : 0
                };
            });
            this._isExporting = false;

            if (slideData.length === 0) {
                this.showToast('⚠️ No slides available to export.');
                return;
            }

            const safeSlideDataJson = JSON.stringify(slideData).replace(/</g, '\\u003c').replace(/>/g, '\\u003e');

            const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>LearnBoard Studio Presentation - All Pages</title>
    <script src="https://cdn.tailwindcss.com"><\/script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <style>
        body { font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; background: #0f172a; color: #f8fafc; }
        .slide-img { max-height: calc(100vh - 160px); max-width: 100%; object-fit: contain; }
        @media print {
            header, footer, button, .no-print { display: none !important; }
            body { background: white !important; color: black !important; }
            .print-slide { page-break-after: always; display: block !important; margin: 0 auto; max-width: 100%; }
        }
    </style>
</head>
<body class="h-screen w-screen flex flex-col overflow-hidden select-none">
    <header class="h-16 px-6 bg-slate-900 border-b border-slate-800 flex items-center justify-between z-10 shadow-md">
        <div class="flex items-center gap-3">
            <div class="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-bold shadow-md shadow-indigo-500/30">
                <i class="fa-solid fa-chalkboard"></i>
            </div>
            <div>
                <h1 class="font-bold text-sm text-white">LearnBoard Studio Interactive Presentation</h1>
                <p class="text-xs text-slate-400">Total ${slideData.length} Page(s) • Generated ${new Date().toLocaleDateString()}</p>
            </div>
        </div>
        <div class="flex items-center gap-3">
            <span id="page-indicator" class="text-xs font-mono font-bold bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-700 text-indigo-400">Page 1 / ${slideData.length}</span>
            <button onclick="toggleFullscreen()" class="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 rounded-lg text-xs font-semibold text-slate-300 transition">
                <i class="fa-solid fa-expand mr-1.5"></i> Fullscreen
            </button>
            <button onclick="window.print()" class="px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-700 rounded-lg text-xs font-bold text-white shadow transition">
                <i class="fa-solid fa-print mr-1.5"></i> Print / PDF
            </button>
        </div>
    </header>

    <main class="flex-1 relative flex items-center justify-center p-6 overflow-hidden bg-slate-950">
        <div class="relative max-w-full max-h-full flex items-center justify-center shadow-2xl rounded-2xl overflow-hidden border border-slate-700/80 bg-slate-900">
            <img id="active-slide-img" src="${slideData[0] ? slideData[0].img : ''}" alt="Slide" class="slide-img rounded-xl shadow-inner transition-all">
        </div>

        <button onclick="prevSlide()" class="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-slate-900/80 hover:bg-indigo-600 border border-slate-700 flex items-center justify-center text-white text-lg shadow-xl transition">
            <i class="fa-solid fa-chevron-left"></i>
        </button>
        <button onclick="nextSlide()" class="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-slate-900/80 hover:bg-indigo-600 border border-slate-700 flex items-center justify-center text-white text-lg shadow-xl transition">
            <i class="fa-solid fa-chevron-right"></i>
        </button>
    </main>

    <footer class="h-20 bg-slate-900 border-t border-slate-800 px-6 flex items-center justify-center gap-3 overflow-x-auto z-10">
        ${slideData.map((s, i) => `
            <div onclick="goToSlide(${i})" class="slide-thumb-btn cursor-pointer p-1 rounded-xl border ${i === 0 ? 'border-indigo-500 bg-indigo-500/20 ring-2 ring-indigo-500' : 'border-slate-700 bg-slate-800'} hover:border-indigo-400 transition" id="thumb-${i}">
                <img src="${s.img}" class="w-20 h-12 object-cover rounded-lg">
                <div class="text-[10px] text-center mt-1 text-slate-300 font-mono">P.${i + 1}</div>
            </div>
        `).join('')}
    </footer>

    <script>
        const slides = ${safeSlideDataJson};
        let currentIndex = 0;

        function updateSlide() {
            if (!slides || slides.length === 0) return;
            document.getElementById('active-slide-img').src = slides[currentIndex].img;
            document.getElementById('page-indicator').textContent = 'Page ' + (currentIndex + 1) + ' / ' + slides.length;
            slides.forEach((_, i) => {
                const el = document.getElementById('thumb-' + i);
                if (el) {
                    if (i === currentIndex) {
                        el.className = 'slide-thumb-btn cursor-pointer p-1 rounded-xl border border-indigo-500 bg-indigo-500/20 ring-2 ring-indigo-500 transition';
                    } else {
                        el.className = 'slide-thumb-btn cursor-pointer p-1 rounded-xl border border-slate-700 bg-slate-800 hover:border-indigo-400 transition';
                    }
                }
            });
        }

        function nextSlide() {
            if (currentIndex < slides.length - 1) { currentIndex++; updateSlide(); }
        }
        function prevSlide() {
            if (currentIndex > 0) { currentIndex--; updateSlide(); }
        }
        function goToSlide(i) {
            if (i >= 0 && i < slides.length) {
                currentIndex = i; updateSlide();
            }
        }
        function toggleFullscreen() {
            if (!document.fullscreenElement) document.documentElement.requestFullscreen().catch(() => {});
            else document.exitFullscreen().catch(() => {});
        }

        window.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'PageDown') nextSlide();
            else if (e.key === 'ArrowLeft' || e.key === 'PageUp') prevSlide();
        });
    <\/script>
</body>
</html>`;

            const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `whiteboard-all-pages-presentation-${Date.now()}.html`;
            document.body.appendChild(a);
            a.click();
            setTimeout(() => {
                if (document.body.contains(a)) document.body.removeChild(a);
                URL.revokeObjectURL(url);
            }, 300);
            this.showToast('✅ Exported HTML presentation successfully!');
            window.soundManager?.playPop?.();
        } catch (error) {
            this._isExporting = false;
            console.error('Error exporting HTML:', error);
            this.showToast('⚠️ Export HTML failed. Please try again.');
        }
    }

    // --- Export All Pages as Microsoft PowerPoint (.pptx) Presentation ---
    async exportAllPagesToPPTX() {
        try {
            if (typeof PptxGenJS === 'undefined') {
                this.showToast('⚠️ PowerPoint export library is loading, please try again in a moment.');
                return;
            }

            this.showToast('⏳ Generating PowerPoint presentation (.pptx)...');
            this._isExporting = true;
            const targetSlides = (Array.isArray(this.slides) && this.slides.length > 0) ? this.slides : [this.currentSlide];

            // Ensure all slides are translated if translation toggle is ON
            if (this.isTranslationActive && window.languageTranslator) {
                for (let s of targetSlides) {
                    await window.languageTranslator.translateObjects(s.objects, this.currentLanguage);
                }
            }

            const pptx = new PptxGenJS();
            pptx.layout = 'LAYOUT_16x9';
            pptx.author = 'LearnBoard Studio';
            pptx.company = 'LearnBoard Studio Pro';
            pptx.title = 'Whiteboard Lecture Presentation';

            for (let idx = 0; idx < targetSlides.length; idx++) {
                const slide = targetSlides[idx];
                const bbox = this.getSlideBoundingBox(slide);
                const dpr = 2.0;
                const offCanvas = document.createElement('canvas');
                offCanvas.width = Math.max(200, Math.round(bbox.width * dpr));
                offCanvas.height = Math.max(200, Math.round(bbox.height * dpr));
                const offCtx = offCanvas.getContext('2d');
                
                if (offCtx) {
                    offCtx.scale(dpr, dpr);

                    let bgColor = this.getSlideBgColor(slide);
                    const isDark = this.isDarkColor(bgColor);

                    offCtx.fillStyle = bgColor;
                    offCtx.fillRect(0, 0, bbox.width, bbox.height);

                    if (this.showGrid) {
                        let gridColor = isDark ? 'rgba(255, 255, 255, 0.1)' : '#e2e8f0';
                        if (this.theme === 'blackboard') gridColor = 'rgba(255, 255, 255, 0.08)';
                        else if (this.theme === 'blueprint') gridColor = 'rgba(255, 255, 255, 0.15)';

                        offCtx.save();
                        offCtx.strokeStyle = gridColor;
                        offCtx.lineWidth = 1;
                        const step = this.gridSize || 25;
                        offCtx.beginPath();
                        for (let x = 0; x < bbox.width; x += step) {
                            offCtx.moveTo(x, 0); offCtx.lineTo(x, bbox.height);
                        }
                        for (let y = 0; y < bbox.height; y += step) {
                            offCtx.moveTo(0, y); offCtx.lineTo(bbox.width, y);
                        }
                        offCtx.stroke();
                        offCtx.restore();
                    }

                    offCtx.translate(-bbox.minX, -bbox.minY);
                    if (Array.isArray(slide.objects)) {
                        slide.objects.forEach(obj => {
                            try {
                                this.renderObject(offCtx, obj);
                            } catch (renderErr) {
                                console.warn('PPTX export object render error:', renderErr);
                            }
                        });
                    }
                }

                let imgData = '';
                try {
                    imgData = offCanvas.toDataURL('image/png', 0.95);
                } catch (dataErr) {
                    imgData = offCanvas.toDataURL();
                }

                const pptSlide = pptx.addSlide();
                // Add slide background image fitting 16:9 layout
                pptSlide.addImage({
                    data: imgData,
                    x: 0,
                    y: 0,
                    w: '100%',
                    h: '100%',
                    sizing: { type: 'contain', w: 10.0, h: 5.625 }
                });
            }

            this._isExporting = false;
            const dateStr = new Date().toISOString().slice(0, 10);
            const filename = `LearnBoard_Lecture_${dateStr}.pptx`;
            await pptx.writeFile({ fileName: filename });
            this.showToast('✅ PowerPoint (.pptx) downloaded successfully!');
            window.soundManager?.playPop?.();
        } catch (err) {
            this._isExporting = false;
            console.error('Error in exportAllPagesToPPTX:', err);
            this.showToast('⚠️ PPTX export failed. Please check browser permissions.');
        }
    }

    exportToJSON() {
        try {
            const project = {
                version: '2.0',
                name: 'Whiteboard Presentation',
                created: new Date().toISOString(),
                theme: this.theme,
                slides: this.slides
            };
            const blob = new Blob([JSON.stringify(project, null, 2)], { type: 'application/json;charset=utf-8' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `whiteboard-project-${Date.now()}.board`;
            document.body.appendChild(a);
            a.click();
            setTimeout(() => {
                if (document.body.contains(a)) document.body.removeChild(a);
                URL.revokeObjectURL(url);
            }, 300);
            this.showToast('✅ Project saved as .board successfully!');
            window.soundManager?.playPop?.();
        } catch (error) {
            console.error('Error exporting JSON:', error);
            this.showToast('⚠️ Failed to save project file.');
        }
    }

    importFromJSON(jsonString) {
        try {
            const data = JSON.parse(jsonString);
            if (data.slides && data.slides.length > 0) {
                this.slides = data.slides.map(s => ({
                    id: s.id || 1,
                    title: s.title || 'Slide',
                    objects: (s.objects || []).map(obj => {
                        if (obj.type === 'image' && obj.src) {
                            if (obj.isGif === undefined) {
                                obj.isGif = this.isGifFormat(obj.src);
                            }
                            const img = new Image();
                            img.crossOrigin = 'anonymous';
                            img.onload = () => { obj.img = img; this.render(); };
                            img.src = obj.src;
                        }
                        return obj;
                    }),
                    undoStack: [],
                    redoStack: []
                }));
                this.currentSlideIndex = 0;
                if (data.theme) this.theme = data.theme;
                this.updateSlideUI();
                this.render();
                this.showToast('✅ Board successfully imported!');
                window.soundManager?.playPop?.();
            }
        } catch (e) {
            console.error('Failed to parse board file:', e);
            this.showToast('⚠️ Failed to parse board file.');
        }
    }
}

window.CanvasEngine = CanvasEngine;
