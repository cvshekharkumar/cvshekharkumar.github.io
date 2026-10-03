// Main Application Coordinator & UI Controller
// Auto-adjust whiteboard with 90% zoom on desktop to fit full window screen
function applyDesktopDefaultZoom() {
    const isDesktop = window.innerWidth >= 1024 || (window.screen && window.screen.width >= 1024);
    if (isDesktop) {
        document.documentElement.style.zoom = '90%';
    } else {
        document.documentElement.style.zoom = '100%';
    }
    document.documentElement.style.width = '100%';
    document.documentElement.style.height = '100%';
    if (window.engine && typeof window.engine.resizeCanvas === 'function') {
        window.engine.resizeCanvas();
    }
}
applyDesktopDefaultZoom();
window.addEventListener('resize', applyDesktopDefaultZoom);
window.addEventListener('orientationchange', () => {
    setTimeout(applyDesktopDefaultZoom, 100);
});

document.addEventListener('DOMContentLoaded', () => {
    applyDesktopDefaultZoom();
    // 1. Initialize Canvas Engine
    const canvas = document.getElementById('whiteboard-canvas');
    const overlayCanvas = document.getElementById('overlay-canvas');
    const engine = new CanvasEngine(canvas, overlayCanvas);
    window.engine = engine;

    // 2. Initialize Learning Widgets
    const widgets = new LearningWidgets(engine);
    window.widgets = widgets;

    // 3. Setup Primary Tools Floating Bar
    const toolButtons = document.querySelectorAll('[data-tool]');
    toolButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const tool = btn.getAttribute('data-tool');
            const isMobile = window.innerWidth <= 768 || ('ontouchstart' in window && window.innerWidth <= 1024);
            if (tool === 'text' && isMobile) {
                engine.addBlankAISolutionCard();
                setActiveTool('select');
                window.soundManager.playClick();
                showToast('📝 Blank AI Solution Card added to Whiteboard!');
                return;
            }
            setActiveTool(tool);
            window.soundManager.playClick();
        });
    });

    function setActiveTool(tool) {
        engine.activeTool = tool;
        if (tool !== 'select' && (engine.selectedObject || (engine.selectedObjects && engine.selectedObjects.length > 0))) {
            engine.selectedObjects = [];
            engine.selectedObject = null;
            engine.render();
        }
        if (engine.activeInlineEditor) {
            engine.commitInlineEditor();
        }

        toolButtons.forEach(b => {
            if (b.getAttribute('data-tool') === tool) {
                b.classList.add('bg-indigo-600', 'text-white', 'shadow-md', 'shadow-indigo-500/30');
                b.classList.remove('text-slate-600', 'dark:text-slate-300', 'hover:bg-slate-100', 'dark:hover:bg-slate-800');
            } else {
                b.classList.remove('bg-indigo-600', 'text-white', 'shadow-md', 'shadow-indigo-500/30');
                b.classList.add('text-slate-600', 'dark:text-slate-300', 'hover:bg-slate-100', 'dark:hover:bg-slate-800');
            }
        });

        // Set cursor
        const wrapper = document.getElementById('canvas-container');
        if (tool === 'hand') wrapper.style.cursor = 'grab';
        else if (tool === 'laser') wrapper.style.cursor = 'crosshair';
        else if (tool === 'eraser') wrapper.style.cursor = 'cell';
        else if (tool === 'select') wrapper.style.cursor = 'default';
        else wrapper.style.cursor = 'crosshair';
    }

    // Default tool
    setActiveTool('pen');

    // 4. Color Target Mode Switcher (Text/Pen vs Background/Fill) & Color Palette
    const btnColorTargetText = document.getElementById('btn-color-target-text');
    const btnColorTargetBg = document.getElementById('btn-color-target-bg');
    const swatchTransparent = document.getElementById('swatch-transparent-fill');
    const customColorInput = document.getElementById('custom-color-picker');
    const customColorPickerLabel = document.getElementById('custom-color-picker-label');
    const colorSwatches = document.querySelectorAll('.color-swatch');

    function setColorTargetMode(mode) {
        engine.colorTarget = mode; // 'text' or 'bg'
        if (mode === 'text') {
            btnColorTargetText?.classList.add('bg-white', 'dark:bg-slate-700', 'text-indigo-600', 'dark:text-indigo-300', 'shadow-sm');
            btnColorTargetText?.classList.remove('text-slate-600', 'dark:text-slate-300');
            btnColorTargetBg?.classList.remove('bg-white', 'dark:bg-slate-700', 'text-indigo-600', 'dark:text-indigo-300', 'shadow-sm');
            btnColorTargetBg?.classList.add('text-slate-600', 'dark:text-slate-300');
            if (swatchTransparent) swatchTransparent.classList.add('hidden');
            
            const activeColor = (engine.selectedObject && (engine.selectedObject.fontColor || engine.selectedObject.textColor))
                || engine.fontColor || engine.strokeColor || '#4f46e5';
            updateActiveColorUI(activeColor);
            if (customColorInput) customColorInput.value = activeColor.startsWith('#') ? activeColor : '#4f46e5';
        } else {
            btnColorTargetBg?.classList.add('bg-white', 'dark:bg-slate-700', 'text-indigo-600', 'dark:text-indigo-300', 'shadow-sm');
            btnColorTargetBg?.classList.remove('text-slate-600', 'dark:text-slate-300');
            btnColorTargetText?.classList.remove('bg-white', 'dark:bg-slate-700', 'text-indigo-600', 'dark:text-indigo-300', 'shadow-sm');
            btnColorTargetText?.classList.add('text-slate-600', 'dark:text-slate-300');
            if (swatchTransparent) swatchTransparent.classList.remove('hidden');

            const activeBg = (engine.selectedObject && (engine.selectedObject.bgColor || engine.selectedObject.fillColor))
                || engine.fillColor || engine.getSlideBgColor() || '#ffffff';
            updateActiveColorUI(activeBg);
            if (customColorInput && activeBg.startsWith('#')) customColorInput.value = activeBg;
        }
    }

    btnColorTargetText?.addEventListener('click', () => {
        setColorTargetMode('text');
        window.soundManager.playClick();
    });

    btnColorTargetBg?.addEventListener('click', () => {
        setColorTargetMode('bg');
        window.soundManager.playClick();
    });

    // Color Swatches Selection
    colorSwatches.forEach(swatch => {
        swatch.addEventListener('click', () => {
            const color = swatch.getAttribute('data-color');
            applyColorSelection(color);
            window.soundManager.playClick();
        });
    });

    if (customColorInput) {
        customColorInput.addEventListener('input', (e) => {
            const color = e.target.value;
            applyColorSelection(color);
        });
    }

    function applyColorSelection(color) {
        if (engine.colorTarget === 'text') {
            // Apply text and stroke color
            engine.strokeColor = color;
            engine.fontColor = color;
            updateActiveColorUI(color);
            if (customColorInput && color.startsWith('#')) customColorInput.value = color;

            if (engine.selectedObjects && engine.selectedObjects.length > 0) {
                engine.saveUndoState();
                engine.selectedObjects.forEach(obj => {
                    if (obj.type === 'text') {
                        obj.fontColor = color;
                        obj.strokeColor = color;
                    } else if (obj.type === 'sticky') {
                        obj.textColor = color;
                    } else {
                        obj.strokeColor = color;
                    }
                });
                engine.render();
                engine.autoSave();
            } else if (engine.selectedObject) {
                engine.saveUndoState();
                if (engine.selectedObject.type === 'text') {
                    engine.selectedObject.fontColor = color;
                    engine.selectedObject.strokeColor = color;
                } else if (engine.selectedObject.type === 'sticky') {
                    engine.selectedObject.textColor = color;
                } else {
                    engine.selectedObject.strokeColor = color;
                }
                engine.render();
                engine.autoSave();
            }
        } else {
            // Apply background / fill color
            engine.fillColor = color;
            updateActiveColorUI(color);
            if (customColorInput && color.startsWith('#')) customColorInput.value = color;

            if (engine.selectedObjects && engine.selectedObjects.length > 0) {
                engine.saveUndoState();
                engine.selectedObjects.forEach(obj => {
                    if (obj.type === 'sticky') {
                        obj.bgColor = color;
                    } else if (obj.type === 'text') {
                        obj.bgColor = color;
                    } else if (['rectangle', 'rect', 'ellipse', 'triangle', 'diamond', 'star'].includes(obj.type)) {
                        obj.fillColor = color;
                    }
                });
                engine.render();
                engine.autoSave();
            } else if (engine.selectedObject) {
                engine.saveUndoState();
                if (engine.selectedObject.type === 'sticky') {
                    engine.selectedObject.bgColor = color;
                } else if (engine.selectedObject.type === 'text') {
                    engine.selectedObject.bgColor = color;
                } else if (['rectangle', 'rect', 'ellipse', 'triangle', 'diamond', 'star'].includes(engine.selectedObject.type)) {
                    engine.selectedObject.fillColor = color;
                } else {
                    engine.setCustomBgColor(color);
                }
                engine.render();
                engine.autoSave();
            } else {
                // No object selected: change canvas board background
                engine.setCustomBgColor(color);
            }
        }
    }

    function updateActiveColorUI(color) {
        colorSwatches.forEach(s => {
            const swatchColor = s.getAttribute('data-color');
            if (swatchColor && swatchColor.toLowerCase() === (color || '').toLowerCase()) {
                s.classList.add('ring-2', 'ring-offset-2', 'ring-indigo-500', 'scale-110');
            } else {
                s.classList.remove('ring-2', 'ring-offset-2', 'ring-indigo-500', 'scale-110');
            }
        });
        if (customColorPickerLabel && color && color.startsWith('#')) {
            customColorPickerLabel.style.borderColor = color;
        }
    }

    // Text Formatting Toolbar Elements
    const btnTextBold = document.getElementById('btn-text-bold');
    const btnTextStrike = document.getElementById('btn-text-strikethrough');
    const btnTextBullet = document.getElementById('btn-text-bullet');
    const btnTextNumbered = document.getElementById('btn-text-numbered');
    const btnFormatPainter = document.getElementById('btn-format-painter');
    const btnDuplicateSelection = document.getElementById('btn-duplicate-selection');
    const btnFontDec = document.getElementById('btn-font-decrease');
    const btnFontInc = document.getElementById('btn-font-increase');
    const toolbarFontDisplay = document.getElementById('toolbar-font-size-display');

    // Synchronize UI controls when an object is selected on canvas
    window.syncObjectProperties = function(obj) {
        if (!obj) {
            updateActiveColorUI(engine.colorTarget === 'text' ? engine.strokeColor : (engine.fillColor || engine.getSlideBgColor()));
            btnTextBold?.classList.remove('bg-indigo-100', 'dark:bg-indigo-900/40', 'text-indigo-600', 'font-bold');
            btnTextStrike?.classList.remove('bg-rose-100', 'dark:bg-rose-950/40', 'text-rose-600', 'font-bold');
            if (toolbarFontDisplay) toolbarFontDisplay.textContent = `${engine.fontSize || 20}px`;
            return;
        }

        // Sync Font Size display
        if (toolbarFontDisplay) {
            toolbarFontDisplay.textContent = `${obj.fontSize || engine.fontSize || 20}px`;
        }

        // Sync Bold and Strikethrough UI state
        const isBold = obj.fontWeight === 'bold';
        btnTextBold?.classList.toggle('bg-indigo-100', isBold);
        btnTextBold?.classList.toggle('dark:bg-indigo-900/40', isBold);
        btnTextBold?.classList.toggle('text-indigo-600', isBold);
        btnTextBold?.classList.toggle('font-bold', isBold);

        const isStruck = Boolean(obj.strikethrough);
        btnTextStrike?.classList.toggle('bg-rose-100', isStruck);
        btnTextStrike?.classList.toggle('dark:bg-rose-950/40', isStruck);
        btnTextStrike?.classList.toggle('text-rose-600', isStruck);
        btnTextStrike?.classList.toggle('font-bold', isStruck);

        if (obj.type === 'text') {
            setColorTargetMode('text');
            const col = obj.fontColor || obj.textColor || obj.strokeColor || engine.strokeColor;
            updateActiveColorUI(col);
            if (customColorInput && col.startsWith('#')) customColorInput.value = col;
        } else if (obj.type === 'sticky') {
            if (engine.colorTarget === 'text') {
                updateActiveColorUI(obj.textColor || '#1e293b');
            } else {
                updateActiveColorUI(obj.bgColor || '#fef08a');
            }
        } else if (['rectangle', 'rect', 'ellipse', 'triangle', 'diamond', 'star'].includes(obj.type)) {
            if (engine.colorTarget === 'text') {
                updateActiveColorUI(obj.strokeColor || engine.strokeColor);
            } else {
                updateActiveColorUI(obj.fillColor || 'transparent');
            }
        }
    };

    // Font Size Adjusters
    btnFontDec?.addEventListener('click', () => engine.changeFontSize(-2));
    btnFontInc?.addEventListener('click', () => engine.changeFontSize(2));

    // Bullet & Numbered List Actions
    btnTextBullet?.addEventListener('click', () => engine.toggleBulletList());
    btnTextNumbered?.addEventListener('click', () => engine.toggleNumberedList());

    // Format Painter Action (Copy / Paste style)
    btnFormatPainter?.addEventListener('click', () => {
        if (engine.formatPainterActive && engine.copiedFormat && engine.selectedObject) {
            engine.pasteFormat(engine.selectedObject);
        } else {
            engine.copyFormat();
        }
    });

    // Copy & Duplicate Selection Action
    btnDuplicateSelection?.addEventListener('click', () => {
        engine.duplicateSelected();
    });

    // Edit Selected Content / Card (Universal Template & AI Tutor Editing)
    document.getElementById('btn-edit-selected-content')?.addEventListener('click', () => {
        const sel = engine.selectedObject || (engine.selectedObjects && engine.selectedObjects.length === 1 ? engine.selectedObjects[0] : null);
        if (sel && engine.isEditableObject(sel)) {
            // Open modern rich content editor modal
            engine.openModernContentEditor(sel);
        } else {
            const center = engine.getViewCenter();
            engine.openModernContentEditor(null, true, center.x, center.y);
        }
    });

    if (btnTextBold) {
        btnTextBold.addEventListener('click', () => {
            if (engine.selectedObject) {
                engine.saveUndoState();
                const isBold = (engine.selectedObject.fontWeight === 'bold');
                engine.selectedObject.fontWeight = isBold ? 'normal' : 'bold';
                window.syncObjectProperties(engine.selectedObject);
                engine.render();
                engine.autoSave();
                window.soundManager?.playClick();
                showToast(isBold ? 'Normal text weight' : '🔤 Bold text enabled');
            } else {
                showToast('💡 Select a text box or note to toggle Bold');
            }
        });
    }

    if (btnTextStrike) {
        btnTextStrike.addEventListener('click', () => {
            if (engine.selectedObject) {
                engine.saveUndoState();
                const isStruck = !engine.selectedObject.strikethrough;
                engine.selectedObject.strikethrough = isStruck;
                window.syncObjectProperties(engine.selectedObject);
                engine.render();
                engine.autoSave();
                window.soundManager?.playPop();
                showToast(isStruck ? '✂️ Cut / Struck through completed text' : '↩️ Removed Strikethrough');
            } else {
                showToast('💡 Select a text box or sticky note to mark completed (cut / strike)');
            }
        });
    }

    // Stroke width buttons
    const strokeWidthBtns = document.querySelectorAll('[data-stroke-width]');
    strokeWidthBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const w = parseInt(btn.getAttribute('data-stroke-width'), 10);
            engine.strokeWidth = w;
            strokeWidthBtns.forEach(b => b.classList.remove('bg-indigo-100', 'dark:bg-indigo-900/40', 'text-indigo-600', 'font-bold'));
            btn.classList.add('bg-indigo-100', 'dark:bg-indigo-900/40', 'text-indigo-600', 'font-bold');
            window.soundManager.playClick();
            if (engine.selectedObject) {
                engine.selectedObject.strokeWidth = w;
                if (engine.selectedObject.type === 'text') {
                    // Also scale text font size nicely
                    const fontSizes = { 2: 16, 4: 22, 8: 32, 16: 48 };
                    engine.selectedObject.fontSize = fontSizes[w] || 22;
                }
                engine.render();
            }
        });
    });

    // 5. Action Controls (Undo, Redo, Clear Slide, Text Box Delete, Zoom, Pan)
    document.getElementById('btn-undo')?.addEventListener('click', () => engine.undo());
    document.getElementById('btn-redo')?.addEventListener('click', () => engine.redo());
    document.getElementById('btn-header-undo')?.addEventListener('click', () => engine.undo());
    document.getElementById('btn-header-redo')?.addEventListener('click', () => engine.redo());
    document.getElementById('btn-text-delete')?.addEventListener('click', () => {
        engine.deleteSelected();
    });
    document.getElementById('btn-rotate-cw')?.addEventListener('click', () => {
        engine.rotateSelected(Math.PI / 2);
    });
    document.getElementById('btn-rotate-ccw')?.addEventListener('click', () => {
        engine.rotateSelected(-Math.PI / 2);
    });
    document.getElementById('btn-flip-h')?.addEventListener('click', () => {
        engine.flipSelected('h');
    });
    document.getElementById('btn-reset-rotation')?.addEventListener('click', () => {
        engine.resetSelectedRotation();
    });
    document.getElementById('btn-clear')?.addEventListener('click', () => engine.clearSlide());
    document.getElementById('btn-zoom-in')?.addEventListener('click', () => engine.zoomIn());
    document.getElementById('btn-zoom-out')?.addEventListener('click', () => engine.zoomOut());
    document.getElementById('btn-zoom-reset')?.addEventListener('click', () => engine.resetView());

    // Spotlight Toggle
    const btnSpotlight = document.getElementById('btn-spotlight');
    if (btnSpotlight) {
        btnSpotlight.addEventListener('click', () => {
            engine.spotlightMode = !engine.spotlightMode;
            btnSpotlight.classList.toggle('bg-amber-500', engine.spotlightMode);
            btnSpotlight.classList.toggle('text-white', engine.spotlightMode);
            window.soundManager.playClick();
        });
    }

    // AI Smart Shape Detection Toggle
    const btnAiShape = document.getElementById('btn-smart-shape');
    if (btnAiShape) {
        btnAiShape.addEventListener('click', () => {
            engine.smartShapeDetection = !engine.smartShapeDetection;
            btnAiShape.classList.toggle('text-indigo-600', engine.smartShapeDetection);
            btnAiShape.classList.toggle('bg-indigo-50', engine.smartShapeDetection);
            window.soundManager.playClick();
        });
    }

    // Audio SFX Toggle
    const btnSound = document.getElementById('btn-sound-toggle');
    if (btnSound) {
        btnSound.addEventListener('click', () => {
            const enabled = window.soundManager.toggle();
            btnSound.classList.toggle('text-slate-400', !enabled);
            btnSound.classList.toggle('text-indigo-600', enabled);
        });
    }

    // 6. Slide Management Bottom Bar
    document.getElementById('btn-add-slide')?.addEventListener('click', () => engine.addSlide());
    document.getElementById('btn-dup-slide')?.addEventListener('click', () => engine.duplicateSlide());
    document.getElementById('btn-del-slide')?.addEventListener('click', () => engine.deleteSlide(engine.currentSlideIndex));
    document.getElementById('btn-prev-slide')?.addEventListener('click', () => engine.switchSlide(engine.currentSlideIndex - 1));
    document.getElementById('btn-next-slide')?.addEventListener('click', () => engine.switchSlide(engine.currentSlideIndex + 1));
    document.getElementById('btn-move-slide-left')?.addEventListener('click', () => engine.moveCurrentSlideLeft());
    document.getElementById('btn-move-slide-right')?.addEventListener('click', () => engine.moveCurrentSlideRight());
    engine.updateSlideUI();

    // 7. Right Drawer System (Templates, Math, Classroom, AI Tutor, Settings)
    const drawer = document.getElementById('learning-drawer');
    const drawerTabs = document.querySelectorAll('[data-drawer-tab]');
    const drawerSections = document.querySelectorAll('.drawer-content-section');
    const btnCloseDrawer = document.getElementById('btn-close-drawer');

    function openDrawerTab(tabId) {
        if (!drawer) return;
        drawer.classList.remove('translate-x-full', 'invisible', 'pointer-events-none');
        drawerSections.forEach(sec => sec.classList.add('hidden'));
        document.getElementById(`tab-content-${tabId}`)?.classList.remove('hidden');

        drawerTabs.forEach(t => {
            if (t.getAttribute('data-drawer-tab') === tabId) {
                t.classList.add('border-indigo-600', 'text-indigo-600', 'dark:text-indigo-400', 'font-semibold');
                t.classList.remove('border-transparent', 'text-slate-500');
            } else {
                t.classList.remove('border-indigo-600', 'text-indigo-600', 'dark:text-indigo-400', 'font-semibold');
                t.classList.add('border-transparent', 'text-slate-500');
            }
        });
        window.soundManager.playClick();
    }

    drawerTabs.forEach(t => {
        t.addEventListener('click', () => openDrawerTab(t.getAttribute('data-drawer-tab')));
    });

    btnCloseDrawer?.addEventListener('click', () => {
        if (!drawer) return;
        drawer.classList.add('translate-x-full', 'invisible', 'pointer-events-none');
        window.soundManager.playClick();
    });

    // Quick open buttons in header & Left Dock Fast Access
    document.getElementById('btn-open-templates')?.addEventListener('click', () => openDrawerTab('templates'));
    document.getElementById('btn-open-math')?.addEventListener('click', () => openDrawerTab('math'));
    document.getElementById('btn-open-classroom')?.addEventListener('click', () => openDrawerTab('classroom'));
    document.getElementById('btn-open-ai')?.addEventListener('click', () => openDrawerTab('ai'));

    // Left Toolbar Dock Fast Access: AI Tutor Study Card & Templates Library
    document.getElementById('btn-dock-ai-tutor')?.addEventListener('click', () => {
        const objs = window.WhiteboardTemplates?.generateTemplate('ai-tutor-solution-card');
        if (objs && objs.length > 0) {
            engine.saveUndoState();
            objs.forEach(o => engine.objects.push(o));
            engine.selectedObjects = [...objs];
            engine.selectedObject = objs[0];
            engine.render();
            engine.autoSave();
            if (window.soundManager && typeof window.soundManager.playChime === 'function') {
                window.soundManager.playChime();
            }
            showToast('🤖 Inserted Text Editor Card (Tap long to copy text, click other box to paste)!');
        }
    });

    document.getElementById('btn-dock-templates')?.addEventListener('click', () => {
        openDrawerTab('templates');
        showToast('📑 Educational Templates & Sample Cards Library (2,000+)');
    });

    // 7.1 Mobile Hamburger Menu Drawer (Three lines ☰)
    const mobileNavDrawer = document.getElementById('mobileNavDrawer');
    const mobileNavContent = document.getElementById('mobileNavContent');
    const mobileNavBackdrop = document.getElementById('mobileNavBackdrop');
    const btnMobileNavToggle = document.getElementById('btn-mobile-nav-toggle');
    const btnCloseMobileNav = document.getElementById('btn-close-mobile-nav');

    function openMobileNav() {
        if (!mobileNavDrawer || !mobileNavContent || !mobileNavBackdrop) return;
        mobileNavDrawer.classList.remove('hidden');
        // Force reflow
        void mobileNavDrawer.offsetWidth;
        mobileNavDrawer.classList.remove('pointer-events-none');
        mobileNavDrawer.classList.add('pointer-events-auto');
        mobileNavBackdrop.classList.remove('opacity-0');
        mobileNavBackdrop.classList.add('opacity-100');
        mobileNavContent.classList.remove('translate-x-full');
        window.soundManager.playClick();
    }

    function closeMobileNav() {
        if (!mobileNavDrawer || !mobileNavContent || !mobileNavBackdrop) return;
        mobileNavBackdrop.classList.remove('opacity-100');
        mobileNavBackdrop.classList.add('opacity-0');
        mobileNavContent.classList.add('translate-x-full');
        mobileNavDrawer.classList.remove('pointer-events-auto');
        mobileNavDrawer.classList.add('pointer-events-none');
        setTimeout(() => {
            mobileNavDrawer.classList.add('hidden');
        }, 300);
        window.soundManager.playClick();
    }

    btnMobileNavToggle?.addEventListener('click', openMobileNav);
    btnCloseMobileNav?.addEventListener('click', closeMobileNav);
    mobileNavBackdrop?.addEventListener('click', closeMobileNav);

    // Mobile nav quick links
    document.getElementById('btn-m-templates')?.addEventListener('click', () => { closeMobileNav(); openDrawerTab('templates'); });
    document.getElementById('btn-m-math')?.addEventListener('click', () => { closeMobileNav(); openDrawerTab('math'); });
    document.getElementById('btn-m-classroom')?.addEventListener('click', () => { closeMobileNav(); openDrawerTab('classroom'); });
    document.getElementById('btn-m-ai')?.addEventListener('click', () => { closeMobileNav(); openDrawerTab('ai'); });
    document.getElementById('btn-m-paste')?.addEventListener('click', () => {
        closeMobileNav();
        engine.pasteCopiedOrClipboard();
    });
    document.getElementById('btn-m-fullscreen')?.addEventListener('click', () => {
        closeMobileNav();
        document.getElementById('btn-fullscreen')?.click();
    });
    document.getElementById('btn-m-undo')?.addEventListener('click', () => engine.undo());
    document.getElementById('btn-m-redo')?.addEventListener('click', () => engine.redo());
    document.getElementById('btn-m-sound')?.addEventListener('click', () => {
        document.getElementById('btn-sound-toggle')?.click();
    });
    document.getElementById('btn-m-clear-cookies')?.addEventListener('click', () => {
        closeMobileNav();
        document.getElementById('btn-clear-cookies')?.click();
    });

    // 8. Render Master Template Library (2,000+ Educational Templates)
    const templatesGrid = document.getElementById('templates-grid');
    const templateSearchInput = document.getElementById('template-search-input');
    const btnClearTemplateSearch = document.getElementById('btn-clear-template-search');
    const recommendationsList = document.getElementById('template-recommendations-list');
    const categoriesList = document.getElementById('template-categories-list');
    const resultsCountEl = document.getElementById('template-results-count');
    const btnLoadMore = document.getElementById('btn-load-more-templates');

    if (templatesGrid && window.WhiteboardTemplates) {
        let currentQuery = '';
        let currentCategory = 'all';
        let currentLimit = 30;
        let currentOffset = 0;
        let renderedTemplates = [];

        // 8.1 Populate Recommended Search Chips
        if (recommendationsList) {
            const recs = window.WhiteboardTemplates.getRecommendedSearches();
            recommendationsList.innerHTML = '';
            recs.forEach(r => {
                const chip = document.createElement('button');
                chip.type = 'button';
                chip.className = 'px-2 py-1 bg-white dark:bg-slate-800 hover:bg-indigo-50 dark:hover:bg-indigo-950/60 hover:text-indigo-600 dark:hover:text-indigo-300 border border-slate-200 dark:border-slate-700 rounded-lg text-[11px] font-medium text-slate-700 dark:text-slate-300 shadow-sm transition-all active:scale-95 flex items-center gap-1 shrink-0';
                chip.innerHTML = `<span>${r.label}</span>`;
                chip.onclick = () => {
                    if (templateSearchInput) {
                        templateSearchInput.value = r.query;
                        currentQuery = r.query;
                        btnClearTemplateSearch?.classList.remove('hidden');
                        currentOffset = 0;
                        renderTemplateCards(true);
                    }
                };
                recommendationsList.appendChild(chip);
            });
        }

        // 8.2 Populate Domain Category Tabs
        if (categoriesList) {
            const cats = window.WhiteboardTemplates.getCategories();
            categoriesList.innerHTML = '';
            cats.forEach((c, idx) => {
                const catBtn = document.createElement('button');
                catBtn.type = 'button';
                const isActive = (idx === 0);
                catBtn.className = `px-2.5 py-1 rounded-lg text-[11px] font-bold border transition-all shrink-0 ${
                    isActive 
                        ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm' 
                        : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700'
                }`;
                catBtn.innerHTML = `<span>${c.name}</span> <span class="opacity-70 font-mono text-[9px]">(${c.count})</span>`;
                catBtn.onclick = () => {
                    categoriesList.querySelectorAll('button').forEach(b => {
                        b.className = 'px-2.5 py-1 rounded-lg text-[11px] font-bold border transition-all shrink-0 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700';
                    });
                    catBtn.className = 'px-2.5 py-1 rounded-lg text-[11px] font-bold border transition-all shrink-0 bg-indigo-600 text-white border-indigo-600 shadow-sm';
                    currentCategory = (c.name === 'All Domains') ? 'all' : c.name;
                    currentOffset = 0;
                    renderTemplateCards(true);
                };
                categoriesList.appendChild(catBtn);
            });
        }

        // 8.3 Render Template Cards with Search & Infinite Pagination
        const renderTemplateCards = (reset = false) => {
            if (reset) {
                templatesGrid.innerHTML = '';
                currentOffset = 0;
                renderedTemplates = [];
            }

            const searchData = window.WhiteboardTemplates.searchTemplates(currentQuery, currentCategory, currentLimit, currentOffset);
            
            if (resultsCountEl) {
                const totalTemplates = window.WhiteboardTemplates.getTotalCount();
                resultsCountEl.textContent = `Showing ${searchData.results.length + renderedTemplates.length} of ${searchData.total} templates (out of ${totalTemplates})`;
            }

            if (searchData.results.length === 0 && renderedTemplates.length === 0) {
                templatesGrid.innerHTML = `
                    <div class="p-6 text-center text-slate-400 dark:text-slate-500 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-dashed border-slate-200 dark:border-slate-800 space-y-2">
                        <i class="fa-solid fa-shapes text-2xl text-slate-300 dark:text-slate-600"></i>
                        <p class="text-xs font-semibold">No templates found for "${currentQuery}".</p>
                        <p class="text-[11px]">Try searching "calculus", "physics", "dna", "cornell", "swot", or click any recommended search chip.</p>
                    </div>
                `;
                if (btnLoadMore) btnLoadMore.classList.add('hidden');
                return;
            }

            searchData.results.forEach(t => {
                renderedTemplates.push(t);
                const card = document.createElement('div');
                card.className = 'p-3 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-indigo-500 dark:hover:border-indigo-500 hover:shadow-md cursor-pointer transition-all group relative overflow-hidden';
                card.innerHTML = `
                    <div class="flex items-center justify-between mb-2 gap-2">
                        <div class="flex items-center gap-1.5 min-w-0">
                            <span class="w-6 h-6 rounded-lg bg-indigo-100 dark:bg-indigo-900/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center text-xs shrink-0 shadow-xs">
                                <i class="${t.icon || 'fa-solid fa-shapes'}"></i>
                            </span>
                            <span class="text-[10px] font-extrabold px-1.5 py-0.5 rounded bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800/80 uppercase tracking-wider truncate">${t.cat}</span>
                        </div>
                        <span class="text-[11px] text-slate-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 font-bold shrink-0 flex items-center gap-1">Insert <i class="fa-solid fa-arrow-right text-[9px]"></i></span>
                    </div>
                    <h4 class="text-xs font-bold text-slate-800 dark:text-slate-100 mb-1 line-clamp-1 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors flex items-center gap-1.5">
                        <span>${t.name}</span>
                    </h4>
                    <p class="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-2">${t.desc}</p>
                    ${t.grade ? `<div class="mt-2 flex items-center gap-1.5 text-[9px] text-slate-400 font-medium"><i class="fa-solid fa-graduation-cap text-indigo-400"></i><span>${t.grade}</span></div>` : ''}
                `;
                card.onclick = () => {
                    const objs = window.WhiteboardTemplates.generateTemplate(t.id);
                    if (objs && objs.length > 0) {
                        engine.saveUndoState();
                        objs.forEach(o => engine.objects.push(o));
                        engine.render();
                        engine.autoSave();
                        if (window.soundManager && typeof window.soundManager.playChime === 'function') {
                            window.soundManager.playChime();
                        }
                        drawer.classList.add('translate-x-full');
                        showToast(`✨ Inserted "${t.name}" onto canvas!`);
                    }
                };
                templatesGrid.appendChild(card);
            });

            if (btnLoadMore) {
                if (searchData.hasMore) {
                    btnLoadMore.classList.remove('hidden');
                } else {
                    btnLoadMore.classList.add('hidden');
                }
            }
        };

        // Initial Load
        renderTemplateCards(true);

        // Live Search Input Event
        let searchTimeout = null;
        templateSearchInput?.addEventListener('input', (e) => {
            const val = e.target.value.trim();
            currentQuery = val;
            if (val) {
                btnClearTemplateSearch?.classList.remove('hidden');
            } else {
                btnClearTemplateSearch?.classList.add('hidden');
            }
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(() => {
                renderTemplateCards(true);
            }, 180);
        });

        // Clear Search Button
        btnClearTemplateSearch?.addEventListener('click', () => {
            if (templateSearchInput) {
                templateSearchInput.value = '';
                currentQuery = '';
                btnClearTemplateSearch.classList.add('hidden');
                templateSearchInput.focus();
                renderTemplateCards(true);
            }
        });

        // Load More Pagination Button
        btnLoadMore?.addEventListener('click', () => {
            currentOffset += currentLimit;
            renderTemplateCards(false);
        });
    }

    // 9. Math Plotter UI Action & Presets
    document.querySelectorAll('.math-preset-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const expr = btn.getAttribute('data-expr');
            const input = document.getElementById('math-plot-input');
            if (input && expr) {
                input.value = expr;
                input.focus();
            }
        });
    });

    document.getElementById('btn-plot-math')?.addEventListener('click', () => {
        const input = document.getElementById('math-plot-input');
        const expr = input ? input.value.trim() : 'x^2 - 4';
        widgets.plotFunctionToCanvas(expr);
        drawer.classList.add('translate-x-full');
        showToast(`📈 Plotted "${expr}" on canvas!`);
    });

    // 9.1 Chemistry Simulation & Plotter Actions
    document.getElementById('btn-plot-titration')?.addEventListener('click', () => {
        widgets.plotChemistryTitration('strong_acid_strong_base');
        drawer.classList.add('translate-x-full');
        showToast('🧪 Acid-Base Titration Curve placed on canvas!');
    });

    document.getElementById('btn-plot-rxn-energy')?.addEventListener('click', () => {
        widgets.plotChemistryReactionCoordinate(true);
        drawer.classList.add('translate-x-full');
        showToast('🔥 Reaction Energy Profile (Ea) placed on canvas!');
    });

    // 9.2 Biology Growth & Enzyme Kinetics Actions
    document.getElementById('btn-plot-bio-growth')?.addEventListener('click', () => {
        widgets.plotBiologyGrowthCurve('logistic');
        drawer.classList.add('translate-x-full');
        showToast('🧬 Logistic Population Growth S-Curve placed on canvas!');
    });

    document.getElementById('btn-plot-enzyme-kinetics')?.addEventListener('click', () => {
        widgets.plotBiologyEnzymeKinetics();
        drawer.classList.add('translate-x-full');
        showToast('⚡ Michaelis-Menten Enzyme Kinetics Curve placed on canvas!');
    });

    document.getElementById('btn-paste-clipboard')?.addEventListener('click', () => {
        engine.pasteCopiedOrClipboard();
    });

    document.getElementById('btn-mobile-copy')?.addEventListener('click', () => {
        engine.copySelected();
    });

    document.getElementById('btn-mobile-paste')?.addEventListener('click', () => {
        engine.pasteCopiedOrClipboard();
    });

    // 10. LaTeX Formula Inserter UI Action
    document.getElementById('btn-insert-latex')?.addEventListener('click', () => {
        const input = document.getElementById('latex-code-input');
        const code = input ? input.value.trim() : '\\int_{a}^{b} f(x)dx = F(b) - F(a)';
        widgets.insertLatexCard(code, 'Math Theorem');
        drawer.classList.add('translate-x-full');
    });

    // 11. Periodic Elements Grid in Drawer
    const periodicContainer = document.getElementById('elements-grid');
    if (periodicContainer && widgets.elementsData) {
        widgets.elementsData.forEach(el => {
            const btn = document.createElement('button');
            btn.className = 'p-2 rounded-lg border text-center transition-all hover:scale-105 hover:shadow flex flex-col items-center justify-center';
            btn.style.borderColor = el.color;
            btn.style.backgroundColor = `${el.color}15`;
            btn.innerHTML = `
                <span class="text-[9px] text-slate-500 font-mono">${el.number}</span>
                <span class="text-base font-extrabold" style="color: ${el.color}">${el.symbol}</span>
                <span class="text-[10px] text-slate-700 dark:text-slate-300 truncate w-full">${el.name}</span>
            `;
            btn.onclick = () => {
                widgets.insertElementCard(el);
                drawer.classList.add('translate-x-full');
            };
            periodicContainer.appendChild(btn);
        });
    }

    // 12. Classroom Timer Controls
    document.getElementById('btn-timer-5m')?.addEventListener('click', () => widgets.startTimer(5));
    document.getElementById('btn-timer-1m')?.addEventListener('click', () => widgets.startTimer(1));
    document.getElementById('btn-timer-pause')?.addEventListener('click', () => widgets.pauseTimer());
    document.getElementById('btn-timer-reset')?.addEventListener('click', () => widgets.resetTimer());

    // 13. Student Random Picker Action
    document.getElementById('btn-pick-student')?.addEventListener('click', () => {
        const textarea = document.getElementById('student-names-input');
        const resultEl = document.getElementById('student-pick-result');
        if (textarea && resultEl) {
            const chosen = widgets.pickRandomStudent(textarea.value);
            resultEl.textContent = `🎉 Picked: ${chosen}`;
        }
    });

    // 14. Interactive Quiz Creator Action
    document.getElementById('btn-create-quiz')?.addEventListener('click', () => {
        const q = document.getElementById('quiz-q-input')?.value || 'What is the speed of light in vacuum?';
        const a = document.getElementById('quiz-opt-a')?.value || '3 × 10⁸ m/s';
        const b = document.getElementById('quiz-opt-b')?.value || '1.5 × 10⁶ m/s';
        const c = document.getElementById('quiz-opt-c')?.value || '9.8 m/s²';
        const d = document.getElementById('quiz-opt-d')?.value || '340 m/s';
        const correct = parseInt(document.getElementById('quiz-correct-select')?.value || '0', 10);
        const expl = 'Answer derived from scientific constants.';

        widgets.insertQuizCard(q, [a, b, c, d], correct, expl);
        setActiveTool('select');
        drawer.classList.add('translate-x-full');
        showToast('⚡ Custom Quiz Card placed on Whiteboard!');
    });

    // 14.1 AI-Powered Quiz Generator Action (Live Google Knowledge Search)
    document.getElementById('btn-generate-ai-quiz')?.addEventListener('click', async () => {
        const topicInput = document.getElementById('ai-quiz-topic-input');
        const previewBox = document.getElementById('ai-quiz-preview-box');
        const topic = topicInput ? topicInput.value.trim() : '';
        if (!topic) return;

        if (previewBox) {
            previewBox.innerHTML = `
                <div class="text-center py-4 space-y-1.5 bg-indigo-50/50 dark:bg-slate-900/50 rounded-xl border border-indigo-100 dark:border-indigo-900">
                    <div class="inline-flex items-center justify-center w-7 h-7 rounded-full bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 animate-spin">
                        <i class="fa-solid fa-spinner"></i>
                    </div>
                    <div class="text-xs font-semibold text-slate-700 dark:text-slate-300">Searching Google AI Knowledge Base...</div>
                    <div class="text-[10px] text-slate-500 font-mono">Topic: "${topic}"</div>
                </div>
            `;
            previewBox.classList.remove('hidden');

            try {
                const quizData = await widgets.generateAIQuiz(topic);
                previewBox.innerHTML = `
                    <div class="p-3 bg-white dark:bg-slate-900 rounded-xl border border-indigo-200 dark:border-indigo-800 space-y-2 shadow-sm break-words">
                        <div class="flex items-center justify-between gap-2">
                            <span class="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">Generated MCQ</span>
                            <span class="text-[9px] px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 font-semibold shrink-0">${quizData.source || 'Live Search'}</span>
                        </div>
                        <h5 class="text-xs font-bold text-slate-800 dark:text-slate-100 leading-snug break-words whitespace-normal">${quizData.question}</h5>
                        <div class="space-y-1">
                            ${quizData.options.map((opt, i) => `
                                <div class="text-[11px] px-2.5 py-1.5 rounded-lg border ${i === quizData.correctIndex ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 font-bold' : 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 text-slate-600 dark:text-slate-400'} flex items-center justify-between gap-2 break-words whitespace-normal">
                                    <span class="break-words">${String.fromCharCode(65 + i)}. ${opt}</span>
                                    ${i === quizData.correctIndex ? '<span class="text-[10px] text-emerald-600 font-bold shrink-0">✓ Correct</span>' : ''}
                                </div>
                            `).join('')}
                        </div>
                        ${quizData.explanation ? `<p class="text-[10px] text-slate-500 italic break-words whitespace-normal">💡 ${quizData.explanation}</p>` : ''}
                        <button id="btn-import-ai-quiz" class="w-full py-2 bg-gradient-to-r from-emerald-600 to-indigo-600 hover:from-emerald-700 hover:to-indigo-700 active:scale-95 text-white rounded-lg text-xs font-bold shadow-md transition flex items-center justify-center gap-1.5">
                            <i class="fa-solid fa-cloud-arrow-down"></i>
                            <span>Import Quiz Card & Take Quiz on Board</span>
                        </button>
                    </div>
                `;

                document.getElementById('btn-import-ai-quiz')?.addEventListener('click', () => {
                    widgets.insertQuizCard(quizData.question, quizData.options, quizData.correctIndex, quizData.explanation);
                    setActiveTool('select');
                    drawer.classList.add('translate-x-full');
                    showToast('🎯 Quiz Card placed! Click any option on the board to test!');
                });
            } catch (err) {
                previewBox.innerHTML = `
                    <div class="p-3 bg-red-50 dark:bg-red-950/40 rounded-xl border border-red-200 dark:border-red-800 text-xs text-red-700 dark:text-red-300">
                        <div class="font-bold mb-1">Search Error</div>
                        <div>Could not retrieve quiz data. Please check your network connection.</div>
                    </div>
                `;
            }
        }
    });

    // Helper function for Regional Voice Mic Speech Input & Auto-Translation to English
    function setupVoiceSpeechInput({
        micBtnId,
        btnTextId,
        langSelectId,
        statusBoxId,
        inputId,
        actionBtnId,
        actionBtnText,
        actionIcon = '🚀'
    }) {
        const micBtn = document.getElementById(micBtnId);
        const btnText = document.getElementById(btnTextId);
        const langSelect = document.getElementById(langSelectId);
        const statusBox = document.getElementById(statusBoxId);
        const targetInput = document.getElementById(inputId);
        const actionBtn = document.getElementById(actionBtnId);

        if (!micBtn || !targetInput) return;

        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

        if (!SpeechRecognition) {
            micBtn.addEventListener('click', () => {
                showToast('⚠️ Voice speech recognition is not supported in this browser. Please use Chrome, Edge, or Safari.');
            });
            return;
        }

        let recognition = null;
        let isListening = false;

        const stopListeningUI = () => {
            isListening = false;
            micBtn.classList.remove('bg-rose-600', 'text-white', 'animate-pulse', 'ring-2', 'ring-rose-400');
            micBtn.classList.add('bg-rose-50', 'dark:bg-rose-950/60', 'text-rose-600', 'dark:text-rose-400');
            if (btnText) btnText.textContent = 'Voice Mic';
        };

        const startListeningUI = (langName) => {
            isListening = true;
            micBtn.classList.remove('bg-rose-50', 'dark:bg-rose-950/60', 'text-rose-600', 'dark:text-rose-400');
            micBtn.classList.add('bg-rose-600', 'text-white', 'animate-pulse', 'ring-2', 'ring-rose-400');
            if (btnText) btnText.textContent = 'Listening...';

            if (statusBox) {
                statusBox.classList.remove('hidden');
                statusBox.innerHTML = `
                    <div class="flex items-center gap-2 text-rose-600 dark:text-rose-400 font-semibold animate-pulse">
                        <span class="w-2 h-2 rounded-full bg-rose-600 shrink-0"></span>
                        <span>🎙️ Listening in <b>${langName}</b>... Speak clearly into your microphone!</span>
                    </div>
                `;
            }
        };

        micBtn.addEventListener('click', () => {
            if (isListening && recognition) {
                try { recognition.stop(); } catch (e) {}
                stopListeningUI();
                return;
            }

            const selectedLang = langSelect ? langSelect.value : 'hi-IN';
            const selectedLangName = langSelect ? (langSelect.options[langSelect.selectedIndex]?.text || selectedLang) : selectedLang;

            try {
                recognition = new SpeechRecognition();
                recognition.lang = selectedLang;
                recognition.interimResults = false;
                recognition.maxAlternatives = 1;
                recognition.continuous = false;

                recognition.onstart = () => {
                    startListeningUI(selectedLangName);
                };

                recognition.onresult = async (event) => {
                    stopListeningUI();
                    const transcript = event.results?.[0]?.[0]?.transcript?.trim() || '';
                    if (!transcript) return;

                    if (statusBox) {
                        statusBox.classList.remove('hidden');
                        statusBox.innerHTML = `
                            <div class="space-y-1">
                                <div class="text-[11px] text-slate-600 dark:text-slate-300">
                                    🎙️ <b>Spoken (${selectedLangName}):</b> "${transcript}"
                                </div>
                                <div class="text-[11px] text-indigo-600 dark:text-indigo-400 flex items-center gap-1.5 font-semibold">
                                    <i class="fa-solid fa-spinner animate-spin"></i>
                                    <span>Translating query to English...</span>
                                </div>
                            </div>
                        `;
                    }

                    // Translate regional spoken language query into academic English
                    let englishQuery = transcript;
                    try {
                        if (window.languageTranslator && typeof window.languageTranslator.translateToEnglish === 'function') {
                            englishQuery = await window.languageTranslator.translateToEnglish(transcript, selectedLang);
                        }
                    } catch (e) {
                        console.warn('Voice translation error:', e);
                    }

                    // Set translated value into input field
                    targetInput.value = englishQuery;
                    targetInput.focus();

                    // Show success status banner with direct trigger button
                    if (statusBox) {
                        statusBox.classList.remove('hidden');
                        statusBox.innerHTML = `
                            <div class="space-y-2 p-1">
                                <div class="flex items-center justify-between text-[10px] text-slate-500">
                                    <span class="truncate">🎙️ <b>Spoken:</b> "${transcript}"</span>
                                    <span class="px-1.5 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 font-bold shrink-0">✓ Translated</span>
                                </div>
                                <div class="text-xs font-semibold text-slate-800 dark:text-slate-100">
                                    🇬🇧 <b>Query:</b> <span id="${statusBoxId}-english-query-text">"${englishQuery}"</span>
                                </div>
                                <p class="text-[10px] text-slate-500 italic">💡 You can edit or refine the text above. Click below to search with your updated query:</p>
                                <button id="${statusBoxId}-quick-btn" class="w-full py-1.5 bg-gradient-to-r from-emerald-600 to-indigo-600 hover:from-emerald-700 hover:to-indigo-700 text-white rounded-lg text-xs font-bold shadow transition flex items-center justify-center gap-1.5 active:scale-95">
                                    <span>${actionIcon}</span>
                                    <span>${actionBtnText}</span>
                                </button>
                            </div>
                        `;

                        document.getElementById(`${statusBoxId}-quick-btn`)?.addEventListener('click', () => {
                            if (actionBtn) actionBtn.click();
                        });
                    }

                    showToast(`🎙️ Spoken query translated! You can edit the text and click generate.`);
                };

                recognition.onerror = (event) => {
                    stopListeningUI();
                    if (event.error !== 'no-speech') {
                        if (statusBox) {
                            statusBox.classList.remove('hidden');
                            statusBox.innerHTML = `
                                <div class="text-rose-600 dark:text-rose-400 text-xs">
                                    ⚠️ Mic error: ${event.error || 'Could not record audio'}. Please check microphone permissions.
                                </div>
                            `;
                        }
                    }
                };

                recognition.onend = () => {
                    stopListeningUI();
                };

                recognition.start();
            } catch (err) {
                stopListeningUI();
                console.error('Speech recognition error:', err);
                showToast('⚠️ Could not start speech recognition. Please check microphone permissions.');
            }
        });

        // Real-time synchronization when user edits the input manually
        targetInput.addEventListener('input', () => {
            const currentVal = targetInput.value.trim();
            const englishDisplay = document.getElementById(`${statusBoxId}-english-query-text`);
            if (englishDisplay) {
                englishDisplay.textContent = currentVal ? `"${currentVal}"` : '(type your topic above)';
            }
        });

        // Pressing Enter in the input immediately triggers generation with latest edited text
        targetInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                if (actionBtn) actionBtn.click();
            }
        });
    }

    // Initialize Regional Voice Mic for AI Quiz Generator
    setupVoiceSpeechInput({
        micBtnId: 'btn-quiz-voice-mic',
        btnTextId: 'quiz-voice-btn-text',
        langSelectId: 'quiz-voice-lang-select',
        statusBoxId: 'quiz-voice-status-box',
        inputId: 'ai-quiz-topic-input',
        actionBtnId: 'btn-generate-ai-quiz',
        actionBtnText: 'Search Google AI & Generate MCQ',
        actionIcon: '✨'
    });

    // Initialize Regional Voice Mic for AI Tutor Assistant
    setupVoiceSpeechInput({
        micBtnId: 'btn-ai-voice-mic',
        btnTextId: 'ai-voice-btn-text',
        langSelectId: 'ai-voice-lang-select',
        statusBoxId: 'ai-voice-status-box',
        inputId: 'ai-prompt-input',
        actionBtnId: 'btn-ask-ai',
        actionBtnText: 'Generate Real-time AI Solution',
        actionIcon: '🚀'
    });

    // 15. AI Learning Assistant Action with Dynamic 1-Click Action Chips
    document.getElementById('btn-ask-ai')?.addEventListener('click', async () => {
        const input = document.getElementById('ai-prompt-input');
        const outputBox = document.getElementById('ai-response-box');
        const query = input ? input.value.trim() : '';
        if (!query) return;

        // Prompt user for API key if not yet set in encrypted cookies
        if (window.apiKeyVault && !window.apiKeyVault.hasKey() && !window._userSkippedApiKeyPrompt) {
            const enteredKey = await window.apiKeyVault.promptKey(
                'AI Tutor Real-time Solution',
                'Enter your Google Gemini API key to activate deep generative derivations & explanations, or continue with free web knowledge search.'
            );
            if (!enteredKey) {
                window._userSkippedApiKeyPrompt = true;
            }
        }

        if (outputBox) {
            outputBox.innerHTML = `
                <div class="text-center py-6 space-y-2">
                    <div class="inline-flex items-center justify-center w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 animate-spin">
                        <i class="fa-solid fa-spinner"></i>
                    </div>
                    <div class="text-xs font-semibold text-slate-700 dark:text-slate-300">Searching Google AI & Knowledge Base...</div>
                    <div class="text-[11px] text-slate-500 font-mono">Query: "${query}"</div>
                </div>`;
            outputBox.classList.remove('hidden');

            try {
                const solution = await widgets.generateAISolution(query);
                
                let currentSolution = solution;
                const diagramRec = widgets.getDiagramRecommendations(query);

                const renderSolutionView = (sol, mode = 'en') => {
                    const isHinglish = (mode === 'hinglish');
                    const isHindi = (mode === 'hindi');
                    const isEnglish = (mode === 'en');

                    let badgeText = 'Live AI Search';
                    let badgeClass = 'bg-indigo-200/60 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-300';
                    let boxBorder = 'border-indigo-200 dark:border-indigo-800 bg-indigo-50 dark:bg-indigo-950/40';
                    let titleColor = 'text-indigo-900 dark:text-indigo-200';
                    let insertBtnClass = 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-500/25';
                    let insertBtnText = 'Insert Solution Directly onto Whiteboard';

                    if (isHinglish) {
                        badgeText = '🇮🇳 Hinglish Mode';
                        badgeClass = 'bg-amber-200/80 dark:bg-amber-900 text-amber-900 dark:text-amber-200';
                        boxBorder = 'border-amber-300 dark:border-amber-700 bg-amber-50/70 dark:bg-amber-950/40';
                        titleColor = 'text-amber-950 dark:text-amber-200';
                        insertBtnClass = 'bg-amber-600 hover:bg-amber-700 text-white shadow-amber-500/25';
                        insertBtnText = 'Insert Hinglish Solution Directly onto Whiteboard';
                    } else if (isHindi) {
                        badgeText = '🇮🇳 Hindi (हिंदी)';
                        badgeClass = 'bg-orange-200/80 dark:bg-orange-900 text-orange-900 dark:text-orange-200';
                        boxBorder = 'border-orange-300 dark:border-orange-700 bg-orange-50/70 dark:bg-orange-950/40';
                        titleColor = 'text-orange-950 dark:text-orange-200';
                        insertBtnClass = 'bg-orange-600 hover:bg-orange-700 text-white shadow-orange-500/25';
                        insertBtnText = 'Insert Hindi Solution Directly onto Whiteboard';
                    }

                    outputBox.innerHTML = `
                        <div class="p-3.5 ${boxBorder} rounded-xl border space-y-2.5 break-words transition-all duration-200">
                            <div class="flex items-center justify-between gap-2">
                                <h4 class="font-bold text-sm ${titleColor} break-words">${sol.title}</h4>
                                <span class="text-[10px] px-2 py-0.5 rounded-full ${badgeClass} font-semibold shrink-0">${badgeText}</span>
                            </div>
                            <p class="text-xs text-slate-700 dark:text-slate-300 break-words whitespace-normal leading-relaxed">${sol.summary}</p>
                            <div class="text-xs space-y-1.5 text-slate-700 dark:text-slate-200 font-mono bg-white/80 dark:bg-slate-900/80 p-2.5 rounded-lg border ${isHinglish ? 'border-amber-200 dark:border-amber-800' : (isHindi ? 'border-orange-200 dark:border-orange-800' : 'border-indigo-100 dark:border-indigo-900')} break-words whitespace-normal">
                                ${sol.steps.map(s => `<div class="leading-relaxed break-words whitespace-normal">${s}</div>`).join('')}
                            </div>
                            ${sol.notes ? `<div class="text-[11px] ${isHinglish ? 'text-amber-800 dark:text-amber-300 font-medium' : (isHindi ? 'text-orange-800 dark:text-orange-300 font-medium' : 'text-slate-500 italic')} break-words whitespace-normal">📌 ${sol.notes}</div>` : ''}
                            
                            <!-- Hinglish & Hindi Recommendation Banners -->
                            ${isHinglish ? `
                                <div class="p-2.5 bg-gradient-to-r from-amber-100 to-orange-100 dark:from-amber-950/80 dark:to-orange-950/80 rounded-xl border border-amber-300 dark:border-amber-600/60 shadow-sm flex items-start gap-2 text-xs text-amber-900 dark:text-amber-200 animate-pulse">
                                    <span class="text-base shrink-0">💡</span>
                                    <div class="leading-snug">
                                        <strong class="font-bold">Recommendation:</strong> Insert this Hinglish solution directly onto your whiteboard for effortless classroom teaching & student comprehension!
                                    </div>
                                </div>
                            ` : ''}

                            ${isHindi ? `
                                <div class="p-2.5 bg-gradient-to-r from-orange-100 to-amber-100 dark:from-orange-950/80 dark:to-amber-950/80 rounded-xl border border-orange-300 dark:border-orange-600/60 shadow-sm flex items-start gap-2 text-xs text-orange-900 dark:text-orange-200 animate-pulse">
                                    <span class="text-base shrink-0">💡</span>
                                    <div class="leading-snug">
                                        <strong class="font-bold">Recommendation:</strong> Insert this Hindi solution directly onto your whiteboard for effortless classroom teaching & student comprehension!
                                    </div>
                                </div>
                            ` : ''}

                            <!-- Action Buttons Row -->
                            <div class="space-y-1.5 pt-1">
                                <!-- Translation Action Buttons Grid -->
                                <div class="grid grid-cols-1 ${!isEnglish ? 'sm:grid-cols-2' : 'sm:grid-cols-2'} gap-1.5">
                                    ${!isHinglish ? `
                                        <button id="btn-translate-hinglish" class="w-full py-1.5 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white rounded-lg text-xs font-bold shadow transition flex items-center justify-center gap-1.5 active:scale-95">
                                            <span>🇮🇳</span> ${isHindi ? 'Switch to Hinglish' : 'Translate to Hinglish (हिंदी + Eng)'}
                                        </button>
                                    ` : ''}

                                    ${!isHindi ? `
                                        <button id="btn-translate-hindi" class="w-full py-1.5 bg-gradient-to-r from-orange-500 to-rose-500 hover:from-orange-600 hover:to-rose-600 text-white rounded-lg text-xs font-bold shadow transition flex items-center justify-center gap-1.5 active:scale-95">
                                            <span>🇮🇳</span> ${isHinglish ? 'Switch to Hindi (हिंदी)' : 'Translate to Hindi (हिंदी)'}
                                        </button>
                                    ` : ''}

                                    ${!isEnglish ? `
                                        <button id="btn-view-english" class="w-full py-1.5 bg-slate-200 hover:bg-slate-300 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-lg text-xs font-semibold transition flex items-center justify-center gap-1.5 active:scale-95">
                                            <span>🔄</span> View English Original
                                        </button>
                                    ` : ''}
                                </div>

                                <!-- Open Diagram Link Button -->
                                ${diagramRec ? `
                                    <a href="${diagramRec.pageUrl || diagramRec.url}" target="_blank" rel="noopener noreferrer" class="w-full px-3 py-1.5 bg-sky-600 hover:bg-sky-700 text-white rounded-lg text-xs font-bold shadow transition flex items-center justify-center gap-1.5">
                                        <i class="fa-solid fa-arrow-up-right-from-square text-xs"></i>
                                        <span>🔗 Open Diagram Link</span>
                                    </a>
                                ` : ''}

                                <!-- Main Insert Button -->
                                <button id="btn-insert-ai-solution" class="w-full py-2 ${insertBtnClass} active:scale-95 rounded-lg text-xs font-bold shadow-md transition flex items-center justify-center gap-1.5">
                                    <span>📋</span> ${insertBtnText}
                                </button>
                            </div>
                        </div>
                    `;

                    // Event listener: Insert into Whiteboard
                    document.getElementById('btn-insert-ai-solution')?.addEventListener('click', () => {
                        widgets.insertAIToCanvas(sol, mode);
                        drawer.classList.add('translate-x-full');
                        if (isHinglish) {
                            showToast('🇮🇳 Hinglish AI Solution added to Whiteboard!');
                        } else if (isHindi) {
                            showToast('🇮🇳 Hindi AI Solution added to Whiteboard!');
                        } else {
                            showToast('✨ AI Solution added to Whiteboard!');
                        }
                    });

                    // Event listener: Translate to Hinglish
                    document.getElementById('btn-translate-hinglish')?.addEventListener('click', async () => {
                        const translateBtn = document.getElementById('btn-translate-hinglish');
                        if (translateBtn) {
                            translateBtn.disabled = true;
                            translateBtn.innerHTML = '<i class="fa-solid fa-spinner animate-spin"></i> Translating to Hinglish...';
                        }
                        try {
                            const hinglishSol = await widgets.translateSolutionToHinglish(solution);
                            renderSolutionView(hinglishSol, 'hinglish');
                        } catch (e) {
                            console.error('Translation error:', e);
                            if (translateBtn) {
                                translateBtn.disabled = false;
                                translateBtn.innerHTML = '<span>🇮🇳</span> Translate to Hinglish (Try Again)';
                            }
                        }
                    });

                    // Event listener: Translate to Hindi
                    document.getElementById('btn-translate-hindi')?.addEventListener('click', async () => {
                        const translateHindiBtn = document.getElementById('btn-translate-hindi');
                        if (translateHindiBtn) {
                            translateHindiBtn.disabled = true;
                            translateHindiBtn.innerHTML = '<i class="fa-solid fa-spinner animate-spin"></i> Translating to Hindi...';
                        }
                        try {
                            const hindiSol = await widgets.translateSolutionToHindi(solution);
                            renderSolutionView(hindiSol, 'hindi');
                        } catch (e) {
                            console.error('Hindi translation error:', e);
                            if (translateHindiBtn) {
                                translateHindiBtn.disabled = false;
                                translateHindiBtn.innerHTML = '<span>🇮🇳</span> Translate to Hindi (Try Again)';
                            }
                        }
                    });

                    // Event listener: Switch Back to English
                    document.getElementById('btn-view-english')?.addEventListener('click', () => {
                        renderSolutionView(solution, 'en');
                    });
                };

                renderSolutionView(solution, 'en');
            } catch (error) {
                outputBox.innerHTML = `
                    <div class="p-3 bg-red-50 dark:bg-red-950/40 rounded-xl border border-red-200 dark:border-red-800 text-xs text-red-700 dark:text-red-300">
                        <div class="font-bold mb-1">Search Error</div>
                        <div>Could not retrieve live search data. Please check your network connection.</div>
                    </div>
                `;
            }
        }
    });

    // 15.1 Quick Sample AI Tutor Template Insert Buttons
    document.getElementById('btn-insert-sample-ai-card')?.addEventListener('click', () => {
        const objs = window.WhiteboardTemplates?.generateTemplate('ai-tutor-solution-card');
        if (objs && objs.length > 0) {
            engine.saveUndoState();
            objs.forEach(o => engine.objects.push(o));
            engine.selectedObjects = [...objs];
            engine.selectedObject = objs[0];
            engine.render();
            engine.autoSave();
            if (window.soundManager && typeof window.soundManager.playChime === 'function') {
                window.soundManager.playChime();
            }
            drawer.classList.add('translate-x-full');
            showToast('🤖 Inserted AI Tutor Study Card onto Whiteboard!');
        }
    });

    document.getElementById('btn-insert-sample-hinglish-card')?.addEventListener('click', () => {
        const objs = window.WhiteboardTemplates?.generateTemplate('ai-tutor-hinglish-card');
        if (objs && objs.length > 0) {
            engine.saveUndoState();
            objs.forEach(o => engine.objects.push(o));
            engine.selectedObjects = [...objs];
            engine.selectedObject = objs[0];
            engine.render();
            engine.autoSave();
            if (window.soundManager && typeof window.soundManager.playChime === 'function') {
                window.soundManager.playChime();
            }
            drawer.classList.add('translate-x-full');
            showToast('🇮🇳 Inserted Hinglish AI Study Notes onto Whiteboard!');
        }
    });

    // 15.4 Google Gemini API Key Encrypted Web Cookie Management
    const geminiKeyInput = document.getElementById('gemini-key-input');
    const btnSaveGeminiKey = document.getElementById('btn-save-gemini-key');
    const btnClearGeminiKey = document.getElementById('btn-clear-gemini-key');
    const btnToggleKeyVisibility = document.getElementById('btn-toggle-key-visibility');
    const apiKeyStatusBadge = document.getElementById('api-key-status-badge');

    function updateApiKeyStatusUI() {
        const hasKey = window.apiKeyVault ? window.apiKeyVault.hasKey() : false;
        const currentKey = window.apiKeyVault ? window.apiKeyVault.getKey() : '';
        if (geminiKeyInput) {
            geminiKeyInput.value = currentKey;
        }
        if (apiKeyStatusBadge) {
            if (hasKey) {
                apiKeyStatusBadge.textContent = '🔒 Saved in Cookie (Encrypted)';
                apiKeyStatusBadge.className = 'text-[9px] px-1.5 py-0.5 rounded-full font-bold bg-emerald-100 dark:bg-emerald-950/70 text-emerald-700 dark:text-emerald-300';
            } else {
                apiKeyStatusBadge.textContent = 'Web Search Active';
                apiKeyStatusBadge.className = 'text-[9px] px-1.5 py-0.5 rounded-full font-bold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300';
            }
        }
    }

    if (geminiKeyInput) {
        updateApiKeyStatusUI();

        // Save on button click
        btnSaveGeminiKey?.addEventListener('click', () => {
            const rawVal = geminiKeyInput.value.trim();
            if (!rawVal) {
                showToast('⚠️ Please enter an API key to save.');
                return;
            }
            if (window.apiKeyVault) {
                window.apiKeyVault.saveKey(rawVal);
                updateApiKeyStatusUI();
                showToast('🔒 API Key encrypted and saved in web cookie!');
                if (window.soundManager && typeof window.soundManager.playSuccess === 'function') {
                    window.soundManager.playSuccess();
                }
            }
        });

        // Clear API key from cookie
        btnClearGeminiKey?.addEventListener('click', () => {
            if (window.apiKeyVault) {
                window.apiKeyVault.removeKey();
                geminiKeyInput.value = '';
                updateApiKeyStatusUI();
                showToast('🗑️ API Key deleted from web cookies.');
            }
        });

        // Toggle password visibility
        let isPassVisible = false;
        btnToggleKeyVisibility?.addEventListener('click', () => {
            isPassVisible = !isPassVisible;
            geminiKeyInput.type = isPassVisible ? 'text' : 'password';
            btnToggleKeyVisibility.innerHTML = isPassVisible ? '<i class="fa-solid fa-eye-slash"></i>' : '<i class="fa-solid fa-eye"></i>';
        });

        // Save on Enter in input
        geminiKeyInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                btnSaveGeminiKey?.click();
            }
        });
    }

    // 15.5 Sheet Language Converter & Translation Toggle Controls
    const desktopLangSelect = document.getElementById('sheet-lang-select');
    const desktopLangToggle = document.getElementById('btn-sheet-lang-toggle');
    const desktopLangDot = document.getElementById('lang-toggle-dot');
    const desktopLangLabel = document.getElementById('lang-toggle-label');

    const mobileLangSelect = document.getElementById('m-sheet-lang-select');
    const mobileLangToggle = document.getElementById('btn-m-sheet-lang-toggle');
    const mobileLangDot = document.getElementById('m-lang-toggle-dot');
    const mobileLangLabel = document.getElementById('m-lang-toggle-label');

    let currentSheetLang = 'hinglish';
    let isSheetLangActive = false;

    function syncLanguageUI(active, lang) {
        isSheetLangActive = active;
        currentSheetLang = lang;

        // Sync dropdown values
        if (desktopLangSelect) desktopLangSelect.value = lang;
        if (mobileLangSelect) mobileLangSelect.value = lang;

        // Update desktop toggle styling
        if (desktopLangToggle) {
            desktopLangToggle.setAttribute('aria-checked', String(active));
            if (active) {
                desktopLangToggle.className = 'flex items-center gap-1 px-2 py-0.5 text-[10px] font-extrabold rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white transition-all shadow-md shadow-emerald-500/20 active:scale-95 select-none ring-2 ring-emerald-400/50';
                if (desktopLangDot) desktopLangDot.className = 'w-2 h-2 rounded-full bg-emerald-200 animate-pulse';
                if (desktopLangLabel) desktopLangLabel.textContent = 'ON';
            } else {
                desktopLangToggle.className = 'flex items-center gap-1 px-2 py-0.5 text-[10px] font-extrabold rounded-lg bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:opacity-90 active:scale-95 transition-all shadow-xs select-none';
                if (desktopLangDot) desktopLangDot.className = 'w-2 h-2 rounded-full bg-slate-400';
                if (desktopLangLabel) desktopLangLabel.textContent = 'OFF';
            }
        }

        // Update mobile toggle styling
        if (mobileLangToggle) {
            mobileLangToggle.setAttribute('aria-checked', String(active));
            if (active) {
                mobileLangToggle.className = 'flex items-center gap-1 px-2 py-0.5 text-[10px] font-extrabold rounded-lg bg-emerald-600 text-white transition-all shadow select-none';
                if (mobileLangDot) mobileLangDot.className = 'w-2 h-2 rounded-full bg-emerald-200 animate-pulse';
                if (mobileLangLabel) mobileLangLabel.textContent = 'ON';
            } else {
                mobileLangToggle.className = 'flex items-center gap-1 px-2 py-0.5 text-[10px] font-extrabold rounded-lg bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300 transition shadow-xs select-none';
                if (mobileLangDot) mobileLangDot.className = 'w-2 h-2 rounded-full bg-slate-400';
                if (mobileLangLabel) mobileLangLabel.textContent = 'OFF';
            }
        }
    }

    async function handleToggleLanguage(newActiveState = null) {
        const nextState = (newActiveState !== null) ? newActiveState : !isSheetLangActive;
        const targetLang = desktopLangSelect ? desktopLangSelect.value : currentSheetLang;
        syncLanguageUI(nextState, targetLang);
        await engine.toggleLanguageTranslation(nextState, targetLang);
    }

    desktopLangToggle?.addEventListener('click', () => handleToggleLanguage());
    mobileLangToggle?.addEventListener('click', () => handleToggleLanguage());

    desktopLangSelect?.addEventListener('change', async (e) => {
        const val = e.target.value;
        syncLanguageUI(isSheetLangActive, val);
        if (isSheetLangActive) {
            await engine.applyTranslationToCurrentSlide(val);
        }
    });

    mobileLangSelect?.addEventListener('change', async (e) => {
        const val = e.target.value;
        syncLanguageUI(isSheetLangActive, val);
        if (isSheetLangActive) {
            await engine.applyTranslationToCurrentSlide(val);
        }
    });

    // 16. Theme & Background Color Selection
    const themeButtons = document.querySelectorAll('[data-theme-btn]');
    themeButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const theme = btn.getAttribute('data-theme-btn');
            engine.setTheme(theme);
            themeButtons.forEach(b => b.classList.remove('ring-2', 'ring-indigo-500', 'border-indigo-500'));
            btn.classList.add('ring-2', 'ring-indigo-500', 'border-indigo-500');
            window.soundManager.playClick();
        });
    });

    // 16.1 Canvas Background Colour Presets (Drawer)
    const themeBgPresets = document.querySelectorAll('.theme-bg-preset');
    const drawerBgPicker = document.getElementById('drawer-custom-bg-picker');
    const drawerBgText = document.getElementById('drawer-custom-bg-text');

    function updateDrawerBgUI(color) {
        themeBgPresets.forEach(btn => {
            const bg = btn.getAttribute('data-bg');
            if (bg && bg.toLowerCase() === (color || '').toLowerCase()) {
                btn.classList.add('ring-2', 'ring-offset-1', 'ring-indigo-500', 'scale-105');
            } else {
                btn.classList.remove('ring-2', 'ring-offset-1', 'ring-indigo-500', 'scale-105');
            }
        });
        if (drawerBgPicker && color && color.startsWith('#')) drawerBgPicker.value = color;
        if (drawerBgText && color && color.startsWith('#')) drawerBgText.value = color.toUpperCase();
    }

    themeBgPresets.forEach(btn => {
        btn.addEventListener('click', () => {
            const bg = btn.getAttribute('data-bg');
            if (bg) {
                engine.setCustomBgColor(bg);
                updateDrawerBgUI(bg);
                window.soundManager.playClick();
                showToast(`🎨 Background set to ${btn.getAttribute('title') || bg}!`);
            }
        });
    });

    if (drawerBgPicker) {
        drawerBgPicker.addEventListener('input', (e) => {
            const color = e.target.value;
            engine.setCustomBgColor(color);
            updateDrawerBgUI(color);
        });
    }

    if (drawerBgText) {
        drawerBgText.addEventListener('change', (e) => {
            let val = e.target.value.trim();
            if (!val.startsWith('#')) val = '#' + val;
            if (/^#[0-9A-Fa-f]{6}$/.test(val)) {
                engine.setCustomBgColor(val);
                updateDrawerBgUI(val);
            }
        });
    }

    document.getElementById('btn-apply-bg-current')?.addEventListener('click', () => {
        const curColor = engine.getSlideBgColor();
        engine.setCustomBgColor(curColor, false);
        window.soundManager.playPop();
        showToast('✅ Background applied to Current Page!');
    });

    document.getElementById('btn-apply-bg-all')?.addEventListener('click', () => {
        const curColor = engine.getSlideBgColor();
        engine.setCustomBgColor(curColor, true);
        window.soundManager.playPop();
        showToast('✨ Background applied across All Pages!');
    });

    // 16.2 Drawer Default Text & Pen Colour Swatches
    const drawerTxtSwatches = document.querySelectorAll('.drawer-txt-swatch');
    const drawerTxtPicker = document.getElementById('drawer-custom-txt-picker');

    function updateDrawerTxtUI(color) {
        drawerTxtSwatches.forEach(s => {
            const sc = s.getAttribute('data-color');
            if (sc && sc.toLowerCase() === (color || '').toLowerCase()) {
                s.classList.add('ring-2', 'ring-offset-1', 'ring-indigo-500', 'scale-110');
            } else {
                s.classList.remove('ring-2', 'ring-offset-1', 'ring-indigo-500', 'scale-110');
            }
        });
        if (drawerTxtPicker && color && color.startsWith('#')) drawerTxtPicker.value = color;
    }

    drawerTxtSwatches.forEach(swatch => {
        swatch.addEventListener('click', () => {
            const color = swatch.getAttribute('data-color');
            engine.strokeColor = color;
            engine.fontColor = color;
            updateDrawerTxtUI(color);
            setColorTargetMode('text');
            window.soundManager.playClick();
            showToast(`✏️ Text colour set to ${color}!`);
        });
    });

    if (drawerTxtPicker) {
        drawerTxtPicker.addEventListener('input', (e) => {
            const color = e.target.value;
            engine.strokeColor = color;
            engine.fontColor = color;
            updateDrawerTxtUI(color);
            setColorTargetMode('text');
        });
    }

    // 16.3 Modern Text Editor Modal Color Pickers
    const modalTxtColors = document.querySelectorAll('.editor-txt-color');
    const modalCustomColor = document.getElementById('editor-custom-txt-color');
    const modalTextarea = document.getElementById('editorModalTextarea');

    modalTxtColors.forEach(btn => {
        btn.addEventListener('click', () => {
            const color = btn.getAttribute('data-color');
            if (modalTextarea && color) {
                modalTextarea.style.color = color;
                engine.fontColor = color;
                engine.strokeColor = color;
            }
            modalTxtColors.forEach(b => b.classList.remove('ring-2', 'ring-indigo-500', 'scale-110'));
            btn.classList.add('ring-2', 'ring-indigo-500', 'scale-110');
            window.soundManager.playClick();
        });
    });

    if (modalCustomColor) {
        modalCustomColor.addEventListener('input', (e) => {
            const color = e.target.value;
            if (modalTextarea) {
                modalTextarea.style.color = color;
                engine.fontColor = color;
                engine.strokeColor = color;
            }
            modalTxtColors.forEach(b => b.classList.remove('ring-2', 'ring-indigo-500', 'scale-110'));
        });
    }

    // 17. Export Dropdown Actions & Mobile Export
    const exportDropdownWrapper = document.getElementById('export-dropdown-wrapper');
    const exportDropdownMenu = document.getElementById('export-dropdown-menu');
    const btnExportToggle = document.getElementById('btn-export-toggle');
    const exportChevron = document.getElementById('export-chevron');

    let isExportDropdownOpen = false;

    function setExportDropdown(open) {
        isExportDropdownOpen = open;
        if (exportDropdownMenu) {
            exportDropdownMenu.classList.toggle('hidden', !open);
        }
        if (exportChevron) {
            exportChevron.style.transform = open ? 'rotate(180deg)' : 'rotate(0deg)';
        }
        if (btnExportToggle) {
            btnExportToggle.classList.toggle('ring-2', open);
            btnExportToggle.classList.toggle('ring-indigo-300', open);
        }
    }

    if (btnExportToggle && exportDropdownMenu) {
        // Toggle on click / tap
        btnExportToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            setExportDropdown(!isExportDropdownOpen);
        });

        // Prevent click inside menu from closing unless an action is triggered
        exportDropdownMenu.addEventListener('click', (e) => {
            e.stopPropagation();
        });

        // Close when clicking outside anywhere on document
        document.addEventListener('click', (e) => {
            if (!exportDropdownWrapper?.contains(e.target)) {
                setExportDropdown(false);
            }
        });

        // Close on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && isExportDropdownOpen) {
                setExportDropdown(false);
            }
        });
    }

    const triggerExport = (action) => {
        setExportDropdown(false);
        const mobileDrawer = document.getElementById('mobileNavDrawer');
        if (mobileDrawer && !mobileDrawer.classList.contains('hidden')) {
            document.getElementById('btn-close-mobile-nav')?.click();
        }
        action();
    };

    // Desktop Export Buttons
    document.getElementById('btn-export-png')?.addEventListener('click', () => triggerExport(async () => await engine.exportToImage('png')));
    document.getElementById('btn-export-jpeg')?.addEventListener('click', () => triggerExport(async () => await engine.exportToImage('jpeg')));
    document.getElementById('btn-export-pptx')?.addEventListener('click', () => triggerExport(async () => await engine.exportAllPagesToPPTX()));
    document.getElementById('btn-export-html')?.addEventListener('click', () => triggerExport(async () => await engine.exportAllPagesToHTML()));
    document.getElementById('btn-export-json')?.addEventListener('click', () => triggerExport(() => engine.exportToJSON()));

    // Mobile Drawer Export Buttons
    document.getElementById('btn-m-export-png')?.addEventListener('click', () => triggerExport(async () => await engine.exportToImage('png')));
    document.getElementById('btn-m-export-jpeg')?.addEventListener('click', () => triggerExport(async () => await engine.exportToImage('jpeg')));
    document.getElementById('btn-m-export-pptx')?.addEventListener('click', () => triggerExport(async () => await engine.exportAllPagesToPPTX()));
    document.getElementById('btn-m-export-html')?.addEventListener('click', () => triggerExport(async () => await engine.exportAllPagesToHTML()));
    document.getElementById('btn-m-export-json')?.addEventListener('click', () => triggerExport(() => engine.exportToJSON()));

    // Import JSON Project (Desktop & Mobile)
    const setupImportHandler = (inputId) => {
        const importInput = document.getElementById(inputId);
        importInput?.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (event) => {
                    engine.importFromJSON(event.target.result);
                    const mobileDrawer = document.getElementById('mobileNavDrawer');
                    if (mobileDrawer && !mobileDrawer.classList.contains('hidden')) {
                        document.getElementById('btn-close-mobile-nav')?.click();
                    }
                };
                reader.readAsText(file);
            }
            e.target.value = '';
        });
    };
    setupImportHandler('project-file-input');
    setupImportHandler('m-project-file-input');

    // Image Upload input
    const imageUploadInput = document.getElementById('image-upload-input');
    imageUploadInput?.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            engine.importImageFile(file);
            setActiveTool('select');
        }
        e.target.value = '';
    });

    // 18. Fullscreen Presentation Mode
    const btnFullscreen = document.getElementById('btn-fullscreen');
    btnFullscreen?.addEventListener('click', () => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen().catch(() => {});
        } else {
            document.exitFullscreen().catch(() => {});
        }
    });

    // 19. Clear Cookies & Screen Data Action
    const btnClearCookies = document.getElementById('btn-clear-cookies');
    btnClearCookies?.addEventListener('click', () => {
        // 1. Clear all document cookies
        const cookies = document.cookie.split(";");
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i];
            const eqPos = cookie.indexOf("=");
            const name = eqPos > -1 ? cookie.substr(0, eqPos).trim() : cookie.trim();
            if (name) {
                document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/";
                document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;domain=" + window.location.hostname;
            }
        }

        // 2. Clear Local & Session Storage & Auto-save keys
        try {
            localStorage.clear();
            sessionStorage.clear();
            localStorage.setItem('whiteboard_cleared_by_user', 'true');
        } catch (e) {}

        // 3. Clear all screen data & reset slides to clean blank canvas
        engine.slides = [
            { id: 1, title: 'Slide 1', objects: [], undoStack: [], redoStack: [] }
        ];
        engine.currentSlideIndex = 0;
        engine.selectedObjects = [];
        engine.selectedObject = null;
        engine.currentStroke = null;
        if (engine.activeInlineEditor) {
            engine.activeInlineEditor.element.remove();
            engine.activeInlineEditor = null;
        }

        // 4. Update UI & Canvas
        engine.updateSlideUI();
        engine.render();

        // 5. Reset any widget inputs & results
        const studentResult = document.getElementById('student-pick-result');
        if (studentResult) studentResult.textContent = '';
        const aiBox = document.getElementById('ai-response-box');
        if (aiBox) aiBox.classList.add('hidden');

        // 6. Remove API key vault cookie & reset badge
        if (window.apiKeyVault) {
            window.apiKeyVault.removeKey();
        }
        if (typeof updateApiKeyStatusUI === 'function') {
            updateApiKeyStatusUI();
        }

        // 7. Visual Feedback & Sound
        showToast('🍪 Cookies & Screen Data Cleared Successfully!');
        window.soundManager.playErase();
    });

    function showToast(message) {
        const existing = document.getElementById('app-toast');
        if (existing) existing.remove();

        const toast = document.createElement('div');
        toast.id = 'app-toast';
        toast.className = 'fixed top-20 right-6 z-50 flex items-center gap-2.5 px-4 py-3 bg-slate-900/90 dark:bg-white/95 text-white dark:text-slate-900 backdrop-blur-md rounded-2xl shadow-2xl border border-slate-700/50 dark:border-slate-200/50 text-xs font-bold animate-in fade-in slide-in-from-top-4 duration-300';
        toast.innerHTML = `
            <i class="fa-solid fa-circle-check text-emerald-400 dark:text-emerald-600 text-sm"></i>
            <span>${message}</span>
        `;
        document.body.appendChild(toast);

        setTimeout(() => {
            toast.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
            toast.style.opacity = '0';
            toast.style.transform = 'translateY(-10px)';
            setTimeout(() => toast.remove(), 400);
        }, 3000);
    }

    // 19. Keyboard Shortcuts helper map
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            const welcomeModal = document.getElementById('welcomeDesktopModal');
            if (welcomeModal && welcomeModal.style.display !== 'none') {
                welcomeModal.style.display = 'none';
            }
            closeMobileNav();
            const sideDrawer = document.getElementById('learning-drawer');
            if (sideDrawer) sideDrawer.classList.add('translate-x-full');
            return;
        }

        if (['INPUT', 'TEXTAREA'].includes(document.activeElement?.tagName)) return;

        if (e.ctrlKey || e.metaKey) {
            const k = e.key.toLowerCase();
            if (k === 'z') {
                e.preventDefault();
                if (e.shiftKey) {
                    engine.redo();
                } else {
                    engine.undo();
                }
                return;
            } else if (k === 'y') {
                e.preventDefault();
                engine.redo();
                return;
            }
        }

        const key = e.key.toLowerCase();
        if (key === 'v') setActiveTool('select');
        else if (key === 'p') setActiveTool('pen');
        else if (key === 'b') setActiveTool('pencil');
        else if (key === 'c') setActiveTool('brush');
        else if (key === 'h') setActiveTool('highlighter');
        else if (key === 'l') setActiveTool('laser');
        else if (key === 'e') setActiveTool('eraser');
        else if (key === 'a') setActiveTool('arrow');
        else if (key === 'u') setActiveTool('curve-arrow');
        else if (key === 'n') setActiveTool('line');
        else if (key === 'k') setActiveTool('curve');
        else if (key === 'r') {
            if (engine.activeTool === 'select' && (engine.selectedObject || (engine.selectedObjects && engine.selectedObjects.length > 0))) {
                engine.rotateSelected(e.shiftKey ? -Math.PI / 2 : Math.PI / 2);
            } else {
                setActiveTool('rect');
            }
        }
        else if (key === 'o') setActiveTool('ellipse');
        else if (key === 'd') setActiveTool('diamond');
        else if (key === 't') {
            const isMobile = window.innerWidth <= 768 || ('ontouchstart' in window && window.innerWidth <= 1024);
            if (isMobile) {
                engine.addBlankAISolutionCard();
                setActiveTool('select');
                showToast('📝 Blank AI Solution Card added to Whiteboard!');
            } else {
                setActiveTool('text');
            }
        }
        else if (key === 's') setActiveTool('sticky');
    });

    // Persistent State Restore across Page Refresh (Only wipes when Clear Cookies is clicked)
    setTimeout(() => {
        const hasSavedState = engine.loadAutoSavedState();
        if (hasSavedState) {
            engine.updateSlideUI();
            engine.render();
        } else if (engine.objects.length === 0 && !localStorage.getItem('whiteboard_cleared_by_user')) {
            const welcomeCornell = window.WhiteboardTemplates.generateCornellNotes();
            welcomeCornell.forEach(o => engine.objects.push(o));
            engine.render();
            engine.autoSave();
        }
    }, 50);
});
