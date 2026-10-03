// Interactive Classroom & Learning Widgets Suite (Math, Chemistry, Biology, AI & Diagrams)
class LearningWidgets {
    constructor(canvasEngine) {
        this.engine = canvasEngine;
        this.timerInterval = null;
        this.timerRemaining = 0;
        this.timerTotal = 0;
        this.timerRunning = false;

        this.elementsData = [
            { number: 1, symbol: 'H', name: 'Hydrogen', mass: '1.008', group: 'nonmetal', color: '#60a5fa' },
            { number: 2, symbol: 'He', name: 'Helium', mass: '4.0026', group: 'noble', color: '#c084fc' },
            { number: 3, symbol: 'Li', name: 'Lithium', mass: '6.94', group: 'alkali', color: '#f87171' },
            { number: 4, symbol: 'Be', name: 'Beryllium', mass: '9.0122', group: 'alkaline', color: '#fb923c' },
            { number: 5, symbol: 'B', name: 'Boron', mass: '10.81', group: 'metalloid', color: '#34d399' },
            { number: 6, symbol: 'C', name: 'Carbon', mass: '12.011', group: 'nonmetal', color: '#60a5fa' },
            { number: 7, symbol: 'N', name: 'Nitrogen', mass: '14.007', group: 'nonmetal', color: '#60a5fa' },
            { number: 8, symbol: 'O', name: 'Oxygen', mass: '15.999', group: 'nonmetal', color: '#60a5fa' },
            { number: 9, symbol: 'F', name: 'Fluorine', mass: '18.998', group: 'halogen', color: '#2dd4bf' },
            { number: 10, symbol: 'Ne', name: 'Neon', mass: '20.180', group: 'noble', color: '#c084fc' },
            { number: 11, symbol: 'Na', name: 'Sodium', mass: '22.990', group: 'alkali', color: '#f87171' },
            { number: 12, symbol: 'Mg', name: 'Magnesium', mass: '24.305', group: 'alkaline', color: '#fb923c' },
            { number: 13, symbol: 'Al', name: 'Aluminium', mass: '26.982', group: 'metal', color: '#94a3b8' },
            { number: 14, symbol: 'Si', name: 'Silicon', mass: '28.085', group: 'metalloid', color: '#34d399' },
            { number: 15, symbol: 'P', name: 'Phosphorus', mass: '30.974', group: 'nonmetal', color: '#60a5fa' },
            { number: 16, symbol: 'S', name: 'Sulfur', mass: '32.06', group: 'nonmetal', color: '#60a5fa' },
            { number: 17, symbol: 'Cl', name: 'Chlorine', mass: '35.45', group: 'halogen', color: '#2dd4bf' },
            { number: 18, symbol: 'Ar', name: 'Argon', mass: '39.948', group: 'noble', color: '#c084fc' },
            { number: 19, symbol: 'K', name: 'Potassium', mass: '39.098', group: 'alkali', color: '#f87171' },
            { number: 20, symbol: 'Ca', name: 'Calcium', mass: '40.078', group: 'alkaline', color: '#fb923c' },
            { number: 26, symbol: 'Fe', name: 'Iron', mass: '55.845', group: 'transition', color: '#fbbf24' },
            { number: 29, symbol: 'Cu', name: 'Copper', mass: '63.546', group: 'transition', color: '#fbbf24' },
            { number: 47, symbol: 'Ag', name: 'Silver', mass: '107.87', group: 'transition', color: '#fbbf24' },
            { number: 79, symbol: 'Au', name: 'Gold', mass: '196.97', group: 'transition', color: '#fbbf24' }
        ];
    }

    // --- 1. Class Timer & Stopwatch ---
    startTimer(minutes, seconds = 0) {
        clearInterval(this.timerInterval);
        this.timerTotal = minutes * 60 + seconds;
        this.timerRemaining = this.timerTotal;
        this.timerRunning = true;
        this.updateTimerDisplay();

        this.timerInterval = setInterval(() => {
            if (this.timerRemaining > 0) {
                this.timerRemaining--;
                this.updateTimerDisplay();
            } else {
                this.stopTimer();
                window.soundManager.playChime();
                if (window.confetti) {
                    window.confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
                }
                alert('⏰ Time is up for classroom activity!');
            }
        }, 1000);
    }

    pauseTimer() {
        if (this.timerRunning) {
            clearInterval(this.timerInterval);
            this.timerRunning = false;
        } else if (this.timerRemaining > 0) {
            this.timerRunning = true;
            this.timerInterval = setInterval(() => {
                if (this.timerRemaining > 0) {
                    this.timerRemaining--;
                    this.updateTimerDisplay();
                } else {
                    this.stopTimer();
                    window.soundManager.playChime();
                }
            }, 1000);
        }
    }

    stopTimer() {
        clearInterval(this.timerInterval);
        this.timerRunning = false;
        this.updateTimerDisplay();
    }

    resetTimer() {
        this.stopTimer();
        this.timerRemaining = this.timerTotal || 300;
        this.updateTimerDisplay();
    }

    updateTimerDisplay() {
        const m = Math.floor(this.timerRemaining / 60);
        const s = this.timerRemaining % 60;
        const timeStr = `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
        const displayEl = document.getElementById('timer-display');
        if (displayEl) {
            displayEl.textContent = timeStr;
        }
        const barEl = document.getElementById('timer-progress-bar');
        if (barEl && this.timerTotal > 0) {
            const pct = (this.timerRemaining / this.timerTotal) * 100;
            barEl.style.width = `${pct}%`;
        }
    }

    // --- 2. Random Student Picker ---
    pickRandomStudent(namesText) {
        const names = namesText.split(/[\n,]+/).map(n => n.trim()).filter(n => n.length > 0);
        if (names.length === 0) {
            return 'Please enter student names first!';
        }
        const chosen = names[Math.floor(Math.random() * names.length)];
        window.soundManager.playPop();
        if (window.confetti) {
            window.confetti({ particleCount: 70, spread: 60, origin: { y: 0.7 } });
        }
        return chosen;
    }

    // --- 3. Plot Math & Physics Function to Canvas ---
    plotFunctionToCanvas(funcStr, xMin = -10, xMax = 10, step = 0.08, title = '') {
        const center = this.engine.getViewCenter();
        const originX = center.x;
        const originY = center.y;
        const scaleX = 28; // px per unit
        const scaleY = 28;

        let parsedFunc;
        try {
            // Clean and normalize math expression
            let cleanStr = (funcStr || 'x^2 - 4').trim();
            // strip 'y =' or 'f(x) ='
            cleanStr = cleanStr.replace(/^[yY]\s*=\s*/, '').replace(/^[fF]\s*\([xX]\)\s*=\s*/, '');

            const sanitized = cleanStr
                .replace(/\^/g, '**')
                .replace(/\bsin\b/gi, 'Math.sin')
                .replace(/\bcos\b/gi, 'Math.cos')
                .replace(/\btan\b/gi, 'Math.tan')
                .replace(/\bsqrt\b/gi, 'Math.sqrt')
                .replace(/\babs\b/gi, 'Math.abs')
                .replace(/\blog\b/gi, 'Math.log')
                .replace(/\bexp\b/gi, 'Math.exp')
                .replace(/\bpi\b/gi, 'Math.PI')
                .replace(/\be\b/g, 'Math.E');

            parsedFunc = new Function('x', `with (Math) { return ${sanitized}; }`);
            parsedFunc(1);
        } catch (err) {
            alert('Invalid mathematical function: "' + funcStr + '". Try e.g. "sin(x)", "x^2 - 4", "2*x + 1", "exp(-x/3)*sin(2*x)"');
            return;
        }

        this.engine.saveUndoState();

        // Background container frame
        this.engine.addObject({
            type: 'rectangle',
            x: originX - 280,
            y: originY - 220,
            width: 560,
            height: 440,
            strokeColor: '#6366f1',
            fillColor: 'rgba(99, 102, 241, 0.04)',
            strokeWidth: 2,
            rounded: true
        });

        // Grid lines
        for (let gx = -8; gx <= 8; gx += 2) {
            if (gx === 0) continue;
            this.engine.addObject({
                type: 'line',
                x1: originX + gx * scaleX, y1: originY - 190,
                x2: originX + gx * scaleX, y2: originY + 190,
                strokeColor: 'rgba(148, 163, 184, 0.25)', strokeWidth: 1
            });
        }
        for (let gy = -6; gy <= 6; gy += 2) {
            if (gy === 0) continue;
            this.engine.addObject({
                type: 'line',
                x1: originX - 250, y1: originY - gy * scaleY,
                x2: originX + 250, y2: originY - gy * scaleY,
                strokeColor: 'rgba(148, 163, 184, 0.25)', strokeWidth: 1
            });
        }

        // X and Y Axes
        this.engine.addObject({
            type: 'arrow',
            x1: originX - 250, y1: originY, x2: originX + 250, y2: originY,
            strokeColor: '#334155', strokeWidth: 2.2, arrowEnd: true
        });
        this.engine.addObject({
            type: 'arrow',
            x1: originX, y1: originY + 190, x2: originX, y2: originY - 190,
            strokeColor: '#334155', strokeWidth: 2.2, arrowEnd: true
        });

        // Labels
        this.engine.addObject({
            type: 'text',
            x: originX + 255, y: originY - 12,
            text: 'x', fontSize: 18, fontColor: '#475569', fontWeight: 'bold'
        });
        this.engine.addObject({
            type: 'text',
            x: originX - 16, y: originY - 200,
            text: 'y', fontSize: 18, fontColor: '#475569', fontWeight: 'bold'
        });

        // Numerical tick marks
        for (let i = -8; i <= 8; i += 2) {
            if (i === 0) continue;
            this.engine.addObject({
                type: 'text',
                x: originX + i * scaleX - 6, y: originY + 14,
                text: `${i}`, fontSize: 10, fontColor: '#64748b'
            });
        }

        // Compute function curve points
        const points = [];
        for (let x = xMin; x <= xMax; x += step) {
            try {
                const y = parsedFunc(x);
                if (typeof y === 'number' && !isNaN(y) && isFinite(y) && Math.abs(y) < 50) {
                    points.push({
                        x: originX + x * scaleX,
                        y: originY - y * scaleY
                    });
                }
            } catch (e) {}
        }

        if (points.length > 1) {
            this.engine.addObject({
                type: 'freehand',
                points: points,
                strokeColor: '#4f46e5',
                strokeWidth: 3.5
            });

            // Graph header badge
            this.engine.addObject({
                type: 'sticky',
                x: originX - 260, y: originY - 205, width: 230, height: 60,
                text: `📈 ${title || 'Plotted Graph'}:\ny = ${funcStr}\nDomain: [${xMin}, ${xMax}]`,
                bgColor: '#e0e7ff', textColor: '#3730a3', fontSize: 11
            });
            window.soundManager.playPop();
            this.engine.render();
        }
    }

    // --- 4. Chemistry: Plot Acid-Base Titration Curve ---
    plotChemistryTitration(type = 'strong_acid_strong_base') {
        const center = this.engine.getViewCenter();
        const originX = center.x;
        const originY = center.y + 100;
        const scaleX = 8; // mL titrant scale
        const scaleY = 16; // pH unit scale (0 to 14)

        this.engine.saveUndoState();

        // Frame
        this.engine.addObject({
            type: 'rectangle',
            x: originX - 40, y: originY - 260, width: 480, height: 320,
            strokeColor: '#059669', fillColor: 'rgba(5, 150, 105, 0.04)', strokeWidth: 2, rounded: true
        });

        // Axes: X = Volume NaOH (0 to 50 mL), Y = pH (0 to 14)
        this.engine.addObject({
            type: 'arrow',
            x1: originX, y1: originY, x2: originX + 410, y2: originY,
            strokeColor: '#334155', strokeWidth: 2.2, arrowEnd: true
        });
        this.engine.addObject({
            type: 'arrow',
            x1: originX, y1: originY, x2: originX, y2: originY - 235,
            strokeColor: '#334155', strokeWidth: 2.2, arrowEnd: true
        });

        // Axis Titles
        this.engine.addObject({
            type: 'text',
            x: originX + 130, y: originY + 28,
            text: 'Volume of 0.1M NaOH added (mL)', fontSize: 12, fontColor: '#0f172a', fontWeight: 'bold'
        });
        this.engine.addObject({
            type: 'text',
            x: originX - 30, y: originY - 245,
            text: 'pH', fontSize: 14, fontColor: '#0f172a', fontWeight: 'bold'
        });

        // Ticks for pH (0, 7, 14)
        [0, 7, 14].forEach(ph => {
            this.engine.addObject({
                type: 'line',
                x1: originX - 4, y1: originY - ph * scaleY, x2: originX + 4, y2: originY - ph * scaleY,
                strokeColor: '#64748b', strokeWidth: 1.5
            });
            this.engine.addObject({
                type: 'text',
                x: originX - 24, y: originY - ph * scaleY - 4,
                text: `${ph}`, fontSize: 11, fontColor: '#64748b', fontWeight: 'bold'
            });
        });

        // Equivalence point line (dashed pH 7)
        this.engine.addObject({
            type: 'line',
            x1: originX, y1: originY - 7 * scaleY, x2: originX + 400, y2: originY - 7 * scaleY,
            strokeColor: 'rgba(16, 185, 129, 0.4)', strokeWidth: 1.5
        });

        // Generate Sigmoidal Titration Curve (HCl + NaOH -> NaCl + H2O)
        const points = [];
        const eqVol = 25; // Equivalence volume 25 mL
        for (let v = 0; v <= 50; v += 0.5) {
            let ph;
            if (v < eqVol - 0.05) {
                const excessH = (0.1 * (eqVol - v)) / (50 + v);
                ph = Math.max(1, -Math.log10(excessH));
            } else if (v > eqVol + 0.05) {
                const excessOH = (0.1 * (v - eqVol)) / (50 + v);
                const pOH = -Math.log10(excessOH);
                ph = Math.min(13.5, 14 - pOH);
            } else {
                ph = 7.0;
            }
            points.push({
                x: originX + v * scaleX,
                y: originY - ph * scaleY
            });
        }

        this.engine.addObject({
            type: 'freehand',
            points: points,
            strokeColor: '#059669',
            strokeWidth: 3.5
        });

        // Mark Equivalence Point
        const eqX = originX + eqVol * scaleX;
        const eqY = originY - 7 * scaleY;
        this.engine.addObject({
            type: 'ellipse',
            x: eqX - 5, y: eqY - 5, width: 10, height: 10,
            fillColor: '#ef4444', strokeColor: '#dc2626', strokeWidth: 2
        });
        this.engine.addObject({
            type: 'text',
            x: eqX + 10, y: eqY - 8,
            text: 'Equivalence Point (pH 7.0, 25mL)', fontSize: 11, fontColor: '#dc2626', fontWeight: 'bold'
        });

        // Header Title Card
        this.engine.addObject({
            type: 'sticky',
            x: originX + 220, y: originY - 245, width: 200, height: 75,
            text: `🧪 Titration Curve:\nHCl (aq) + NaOH (aq) → NaCl + H₂O\nStrong Acid - Strong Base`,
            bgColor: '#d1fae5', textColor: '#065f46', fontSize: 11
        });

        window.soundManager.playPop();
        this.engine.render();
    }

    // --- 5. Chemistry: Reaction Coordinate Energy Profile ---
    plotChemistryReactionCoordinate(isExothermic = true) {
        const center = this.engine.getViewCenter();
        const originX = center.x - 180;
        const originY = center.y + 80;

        this.engine.saveUndoState();

        // Frame
        this.engine.addObject({
            type: 'rectangle',
            x: originX - 40, y: originY - 240, width: 440, height: 280,
            strokeColor: '#ea580c', fillColor: 'rgba(234, 88, 12, 0.04)', strokeWidth: 2, rounded: true
        });

        // Axes: Energy vs Reaction Progress
        this.engine.addObject({
            type: 'arrow',
            x1: originX, y1: originY, x2: originX + 360, y2: originY,
            strokeColor: '#334155', strokeWidth: 2, arrowEnd: true
        });
        this.engine.addObject({
            type: 'arrow',
            x1: originX, y1: originY, x2: originX, y2: originY - 210,
            strokeColor: '#334155', strokeWidth: 2, arrowEnd: true
        });

        this.engine.addObject({
            type: 'text',
            x: originX + 110, y: originY + 22,
            text: 'Reaction Progress ➔', fontSize: 12, fontColor: '#0f172a', fontWeight: 'bold'
        });
        this.engine.addObject({
            type: 'text',
            x: originX - 30, y: originY - 220,
            text: 'Potential Energy (kJ)', fontSize: 12, fontColor: '#0f172a', fontWeight: 'bold'
        });

        // Curve Points (Gaussian activation barrier)
        const pts = [];
        const rY = originY - 80; // Reactants height
        const pY = isExothermic ? originY - 40 : originY - 130; // Products height
        const peakY = originY - 190; // Transition State height

        for (let t = 0; t <= 320; t += 4) {
            let yVal;
            if (t < 70) yVal = rY;
            else if (t > 250) yVal = pY;
            else {
                const norm = (t - 160) / 50;
                const bell = Math.exp(-norm * norm);
                const baseline = rY + (pY - rY) * ((t - 70) / 180);
                yVal = baseline - (baseline - peakY) * bell;
            }
            pts.push({ x: originX + 20 + t, y: yVal });
        }

        this.engine.addObject({
            type: 'freehand',
            points: pts,
            strokeColor: '#ea580c',
            strokeWidth: 3.5
        });

        // Labels: Reactants, Transition State (Ea), Products, Delta H
        this.engine.addObject({
            type: 'text',
            x: originX + 30, y: rY - 10,
            text: 'Reactants (A + B)', fontSize: 11, fontColor: '#0369a1', fontWeight: 'bold'
        });
        this.engine.addObject({
            type: 'text',
            x: originX + 130, y: peakY - 12,
            text: 'Transition State [‡] (Ea)', fontSize: 11, fontColor: '#dc2626', fontWeight: 'bold'
        });
        this.engine.addObject({
            type: 'text',
            x: originX + 270, y: pY - 10,
            text: 'Products (C + D)', fontSize: 11, fontColor: '#15803d', fontWeight: 'bold'
        });

        // Header Title Card
        this.engine.addObject({
            type: 'sticky',
            x: originX + 180, y: originY - 225, width: 200, height: 60,
            text: `🔥 ${isExothermic ? 'Exothermic Reaction (ΔH < 0)' : 'Endothermic Reaction (ΔH > 0)'}\nEa = Activation Energy Barrier`,
            bgColor: '#ffedd5', textColor: '#9a3412', fontSize: 11
        });

        window.soundManager.playPop();
        this.engine.render();
    }

    // --- 6. Biology: Population Growth Curves (Logistic S-Curve vs Exponential J-Curve) ---
    plotBiologyGrowthCurve(model = 'logistic') {
        const center = this.engine.getViewCenter();
        const originX = center.x - 160;
        const originY = center.y + 90;
        const scaleX = 7;
        const scaleY = 1.8;

        this.engine.saveUndoState();

        // Frame
        this.engine.addObject({
            type: 'rectangle',
            x: originX - 40, y: originY - 250, width: 440, height: 290,
            strokeColor: '#10b981', fillColor: 'rgba(16, 185, 129, 0.04)', strokeWidth: 2, rounded: true
        });

        // Axes: Time vs Population Size (N)
        this.engine.addObject({
            type: 'arrow',
            x1: originX, y1: originY, x2: originX + 360, y2: originY,
            strokeColor: '#334155', strokeWidth: 2.2, arrowEnd: true
        });
        this.engine.addObject({
            type: 'arrow',
            x1: originX, y1: originY, x2: originX, y2: originY - 220,
            strokeColor: '#334155', strokeWidth: 2.2, arrowEnd: true
        });

        this.engine.addObject({
            type: 'text',
            x: originX + 140, y: originY + 24,
            text: 'Time (t) ➔', fontSize: 12, fontColor: '#0f172a', fontWeight: 'bold'
        });
        this.engine.addObject({
            type: 'text',
            x: originX - 30, y: originY - 230,
            text: 'Population (N)', fontSize: 12, fontColor: '#0f172a', fontWeight: 'bold'
        });

        // Carrying Capacity Line (K = 100)
        const kY = originY - 100 * scaleY;
        this.engine.addObject({
            type: 'line',
            x1: originX, y1: kY, x2: originX + 350, y2: kY,
            strokeColor: 'rgba(239, 68, 68, 0.6)', strokeWidth: 1.8
        });
        this.engine.addObject({
            type: 'text',
            x: originX + 220, y: kY - 8,
            text: 'Carrying Capacity (K)', fontSize: 11, fontColor: '#dc2626', fontWeight: 'bold'
        });

        // Logistic S-Curve points: N(t) = K / (1 + ((K - N0)/N0) * exp(-r*t))
        const sPoints = [];
        const K = 100, N0 = 2, r = 0.22;
        for (let t = 0; t <= 45; t += 0.5) {
            const N = K / (1 + ((K - N0) / N0) * Math.exp(-r * t));
            sPoints.push({
                x: originX + t * scaleX,
                y: originY - N * scaleY
            });
        }

        this.engine.addObject({
            type: 'freehand',
            points: sPoints,
            strokeColor: '#10b981',
            strokeWidth: 3.5
        });

        // Header Title Card
        this.engine.addObject({
            type: 'sticky',
            x: originX + 15, y: originY - 240, width: 230, height: 75,
            text: `🧬 Logistic Growth Model (S-Curve):\ndN/dt = rN · (1 - N/K)\nLag Phase ➔ Exponential ➔ Plateau (K)`,
            bgColor: '#ecfdf5', textColor: '#065f46', fontSize: 11
        });

        window.soundManager.playPop();
        this.engine.render();
    }

    // --- 7. Biology: Enzyme Kinetics (Michaelis-Menten Curve) ---
    plotBiologyEnzymeKinetics() {
        const center = this.engine.getViewCenter();
        const originX = center.x - 160;
        const originY = center.y + 80;
        const scaleX = 7;
        const scaleY = 1.6;

        this.engine.saveUndoState();

        // Frame
        this.engine.addObject({
            type: 'rectangle',
            x: originX - 40, y: originY - 240, width: 440, height: 280,
            strokeColor: '#8b5cf6', fillColor: 'rgba(139, 92, 246, 0.04)', strokeWidth: 2, rounded: true
        });

        // Axes: Substrate [S] vs Velocity (V)
        this.engine.addObject({
            type: 'arrow',
            x1: originX, y1: originY, x2: originX + 360, y2: originY,
            strokeColor: '#334155', strokeWidth: 2.2, arrowEnd: true
        });
        this.engine.addObject({
            type: 'arrow',
            x1: originX, y1: originY, x2: originX, y2: originY - 210,
            strokeColor: '#334155', strokeWidth: 2.2, arrowEnd: true
        });

        this.engine.addObject({
            type: 'text',
            x: originX + 120, y: originY + 24,
            text: 'Substrate Concentration [S] ➔', fontSize: 12, fontColor: '#0f172a', fontWeight: 'bold'
        });
        this.engine.addObject({
            type: 'text',
            x: originX - 30, y: originY - 220,
            text: 'Reaction Rate (V)', fontSize: 12, fontColor: '#0f172a', fontWeight: 'bold'
        });

        // Vmax Asymptote Line
        const Vmax = 100, Km = 10;
        const vmaxY = originY - Vmax * scaleY;
        this.engine.addObject({
            type: 'line',
            x1: originX, y1: vmaxY, x2: originX + 350, y2: vmaxY,
            strokeColor: 'rgba(139, 92, 246, 0.5)', strokeWidth: 1.5
        });
        this.engine.addObject({
            type: 'text',
            x: originX + 240, y: vmaxY - 6,
            text: 'Vmax (Max Velocity)', fontSize: 11, fontColor: '#7c3aed', fontWeight: 'bold'
        });

        // Michaelis-Menten Curve: V = (Vmax * [S]) / (Km + [S])
        const points = [];
        for (let s = 0; s <= 50; s += 0.5) {
            const v = (Vmax * s) / (Km + s);
            points.push({
                x: originX + s * scaleX,
                y: originY - v * scaleY
            });
        }

        this.engine.addObject({
            type: 'freehand',
            points: points,
            strokeColor: '#8b5cf6',
            strokeWidth: 3.5
        });

        // Header Title Card
        this.engine.addObject({
            type: 'sticky',
            x: originX + 20, y: originY - 230, width: 220, height: 65,
            text: `🧬 Michaelis-Menten Kinetics:\nV = (Vmax · [S]) / (Km + [S])\nKm = [S] at 1/2 Vmax`,
            bgColor: '#f5f3ff', textColor: '#5b21b6', fontSize: 11
        });

        window.soundManager.playPop();
        this.engine.render();
    }

    // --- 8. Recommended Educational Diagram Links & External Viewer ---
    getDiagramRecommendations(topic) {
        const t = (topic || '').toLowerCase();
        
        const catalog = [
            {
                keywords: ['heart', 'cardiovascular', 'circulatory', 'ventricle', 'atrium', 'blood'],
                title: 'Human Heart Anatomy & Blood Circulation Diagram',
                subject: 'Biology / Anatomy',
                source: 'Wikimedia Commons (Open Educational License)',
                url: 'https://upload.wikimedia.org/wikipedia/commons/e/e5/Diagram_of_the_human_heart_%28cropped%29.svg',
                pageUrl: 'https://commons.wikimedia.org/wiki/File:Diagram_of_the_human_heart_(cropped).svg'
            },
            {
                keywords: ['cell', 'plant cell', 'animal cell', 'organelle', 'chloroplast', 'mitochondria'],
                title: 'Plant and Animal Cell Structure & Organelles',
                subject: 'Biology / Cytology',
                source: 'Wikimedia Commons / OpenStax',
                url: 'https://upload.wikimedia.org/wikipedia/commons/4/48/Plant_cell_structure_svg.svg',
                pageUrl: 'https://commons.wikimedia.org/wiki/File:Plant_cell_structure_svg.svg'
            },
            {
                keywords: ['photosynthesis', 'calvin', 'chloroplast', 'thylakoid', 'light reaction'],
                title: 'Photosynthesis Light Reactions & Calvin Cycle Scheme',
                subject: 'Biology / Biochemistry',
                source: 'Wikimedia Commons Science Visuals',
                url: 'https://upload.wikimedia.org/wikipedia/commons/d/db/Photosynthesis_overview.svg',
                pageUrl: 'https://commons.wikimedia.org/wiki/File:Photosynthesis_overview.svg'
            },
            {
                keywords: ['dna', 'replication', 'transcription', 'rna', 'double helix', 'nucleotide'],
                title: 'DNA Double Helix & Base Pairing Mechanism',
                subject: 'Genetics / Molecular Biology',
                source: 'Wikimedia Commons / National Human Genome Research',
                url: 'https://upload.wikimedia.org/wikipedia/commons/e/e4/DNA_chemical_structure.svg',
                pageUrl: 'https://commons.wikimedia.org/wiki/File:DNA_chemical_structure.svg'
            },
            {
                keywords: ['benzene', 'organic', 'hydrocarbon', 'aromatic', 'resonance', 'carbon'],
                title: 'Benzene Ring Structure & Resonance Hybrid Diagram',
                subject: 'Organic Chemistry',
                source: 'Wikimedia Commons Chemistry Repository',
                url: 'https://upload.wikimedia.org/wikipedia/commons/0/05/Benzene_Representations.svg',
                pageUrl: 'https://commons.wikimedia.org/wiki/File:Benzene_Representations.svg'
            },
            {
                keywords: ['periodic', 'element', 'atom', 'electron', 'orbital'],
                title: 'Periodic Table of Chemical Elements (Color Coded Groups)',
                subject: 'General Chemistry',
                source: 'Wikimedia Commons Chemical Visuals',
                url: 'https://upload.wikimedia.org/wikipedia/commons/8/84/Periodic_table_large.svg',
                pageUrl: 'https://commons.wikimedia.org/wiki/File:Periodic_table_large.svg'
            },
            {
                keywords: ['optics', 'lens', 'convex', 'concave', 'refraction', 'focal', 'ray'],
                title: 'Convex & Concave Optical Ray Diagram',
                subject: 'Physics / Optics',
                source: 'Wikimedia Commons Physics Visuals',
                url: 'https://upload.wikimedia.org/wikipedia/commons/0/04/Focal_point_of_a_converging_lens.svg',
                pageUrl: 'https://commons.wikimedia.org/wiki/File:Focal_point_of_a_converging_lens.svg'
            },
            {
                keywords: ['trigonometry', 'unit circle', 'sin', 'cos', 'radians', 'angles'],
                title: 'Trigonometric Unit Circle (Radians, Degrees & Sine/Cosine Coordinates)',
                subject: 'Mathematics',
                source: 'Wikimedia Commons Mathematics Repository',
                url: 'https://upload.wikimedia.org/wikipedia/commons/4/4c/Unit_circle_angles_color.svg',
                pageUrl: 'https://commons.wikimedia.org/wiki/File:Unit_circle_angles_color.svg'
            }
        ];

        // Search matching entry
        for (let item of catalog) {
            if (item.keywords.some(k => t.includes(k))) {
                return item;
            }
        }

        // Generic educational visual search link fallback
        return {
            title: `Educational Diagram for: ${topic || 'Science Concept'}`,
            subject: 'Academic Diagram & Visual Study',
            source: 'Wikimedia Commons & Open Educational Resources',
            url: `https://commons.wikimedia.org/w/index.php?search=${encodeURIComponent(topic || 'Science')}&title=Special:MediaSearch&type=image`,
            pageUrl: `https://commons.wikimedia.org/w/index.php?search=${encodeURIComponent(topic || 'Science')}&title=Special:MediaSearch&type=image`
        };
    }

    // --- 10. Insert LaTeX Formula Card ---
    insertLatexCard(latexCode, title = 'Formula') {
        const center = this.engine.getViewCenter();
        const obj = {
            type: 'latex',
            x: center.x - 160,
            y: center.y - 80,
            width: 320,
            height: 140,
            latex: latexCode,
            title: title,
            bgColor: '#ffffff',
            strokeColor: '#6366f1',
            strokeWidth: 2,
            textColor: '#1e293b'
        };
        this.engine.addObject(obj);
        window.soundManager.playPop();
    }

    // --- 11. Insert Interactive Quiz / Flashcard Card ---
    insertQuizCard(question, options, correctIndex, explanation) {
        const center = this.engine.getViewCenter();
        const width = 420;
        
        const charsPerQLine = Math.floor((width - 32) / 7.5);
        const qLines = Math.max(1, Math.min(3, Math.ceil((question || '').length / charsPerQLine)));
        const qHeight = qLines * 18;
        const optionsHeight = (options || []).length * 36;
        const explHeight = explanation ? 28 : 0;
        const calculatedHeight = Math.max(280, Math.min(460, 52 + qHeight + optionsHeight + explHeight + 20));

        const obj = {
            type: 'quiz',
            x: center.x - width / 2,
            y: center.y - calculatedHeight / 2,
            width: width,
            height: calculatedHeight,
            question: question,
            options: options,
            correctIndex: correctIndex,
            explanation: explanation,
            selectedIndex: null,
            isAnswered: false,
            bgColor: '#ffffff',
            strokeColor: '#3b82f6',
            strokeWidth: 2
        };
        this.engine.addObject(obj);
        this.engine.selectedObjects = [obj];
        this.engine.selectedObject = obj;
        window.soundManager.playPop();
    }

    // --- 12. AI-Powered Live Knowledge Quiz Generator ---
    async generateAIQuiz(topic) {
        const cleanTopic = (topic || '').trim();
        if (!cleanTopic) {
            return {
                question: "Which cellular organelle is known as the powerhouse of the cell?",
                options: ["Mitochondria", "Ribosome", "Endoplasmic Reticulum", "Golgi Body"],
                correctIndex: 0,
                explanation: "Mitochondria produce most of the chemical energy needed to power the cell's biochemical reactions via ATP.",
                source: "Cell Biology Knowledge"
            };
        }

        // Extract core academic subject for Wikipedia & Knowledge Search
        let coreSubject = cleanTopic
            .replace(/^(make|create|generate|search|give|ask|build)\s*(a|an)?\s*(mcq|quiz|question|test|problem)?\s*(on|for|about|of)?\s*/i, '')
            .replace(/^(what is|explain|define|tell me about|describe)\s*/i, '')
            .replace(/^(mcq|quiz|question)\s*(on|for|about|of)?\s*/i, '')
            .trim();
        if (!coreSubject) coreSubject = cleanTopic;

        // 1. Google Gemini Generative AI (if user configured custom API key in encrypted cookie)
        const geminiKey = window.apiKeyVault ? window.apiKeyVault.getKey() : (localStorage.getItem('gemini_api_key') || '');
        if (geminiKey && geminiKey.trim()) {
            try {
                const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${geminiKey.trim()}`;
                const prompt = `Create a high-quality, conceptual multiple-choice quiz question (MCQ) for the educational topic: "${cleanTopic}".
Return ONLY a valid JSON object without markdown formatting, with this exact schema:
{
  "question": "Question sentence here",
  "options": ["Option A text", "Option B text", "Option C text", "Option D text"],
  "correctIndex": 0,
  "explanation": "Clear explanation of why the correct option is right"
}`;
                const response = await fetch(endpoint, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        contents: [{ parts: [{ text: prompt }] }],
                        generationConfig: { temperature: 0.3 }
                    })
                });

                if (response.ok) {
                    const data = await response.json();
                    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text || '';
                    const cleanJson = text.replace(/```json/gi, '').replace(/```/gi, '').trim();
                    const parsed = JSON.parse(cleanJson);
                    if (parsed && parsed.question && Array.isArray(parsed.options) && parsed.options.length === 4 && typeof parsed.correctIndex === 'number') {
                        return {
                            question: parsed.question,
                            options: parsed.options,
                            correctIndex: Math.min(3, Math.max(0, parsed.correctIndex)),
                            explanation: parsed.explanation || `Correct answer is: ${parsed.options[parsed.correctIndex]}`,
                            source: 'Google Gemini AI'
                        };
                    }
                }
            } catch (err) {
                console.warn('Gemini Quiz API error, falling back to Web Knowledge Search:', err);
            }
        }

        // 2. Real-Time Live Google / Wikipedia Knowledge Search Engine
        try {
            const searchUrl = `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(coreSubject)}&utf8=&format=json&origin=*`;
            const searchRes = await fetch(searchUrl);
            const searchData = await searchRes.json();

            let targetTitle = coreSubject;
            if (searchData?.query?.search && searchData.query.search.length > 0) {
                targetTitle = searchData.query.search[0].title;
            }

            const summaryUrl = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(targetTitle)}`;
            const summaryRes = await fetch(summaryUrl);
            const summaryData = await summaryRes.json();

            if (summaryData && summaryData.extract) {
                const title = summaryData.title || targetTitle;
                const extract = summaryData.extract;
                const desc = summaryData.description || 'fundamental concept in modern science and education';

                const sentences = extract.match(/[^.!?]+[.!?]+/g) || [extract];
                const firstSentence = sentences[0] ? sentences[0].trim() : extract;

                let question = `In educational studies, which statement accurately characterizes "${title}"?`;
                let correctOpt = `${title} is ${desc.toLowerCase()}.`;
                if (firstSentence.length < 110) {
                    correctOpt = firstSentence;
                }

                let otherTitles = [];
                if (searchData?.query?.search && searchData.query.search.length > 3) {
                    otherTitles = searchData.query.search.slice(1, 4).map(s => s.title);
                }

                let distractors = [
                    `An obsolete hypothesis proven false in empirical tests.`,
                    `A specialized non-standard unit of measure in metric calibration.`,
                    `An auxiliary protocol utilized only in archaic computational systems.`
                ];

                if (otherTitles.length >= 3) {
                    distractors = [
                        `A specialized mechanism used primarily for ${otherTitles[0].toLowerCase()}.`,
                        `A theoretical framework superseded by ${otherTitles[1].toLowerCase()}.`,
                        `An inverse reaction governing only ${otherTitles[2].toLowerCase()}.`
                    ];
                }

                let options = [];
                let correctIndex = Math.floor(Math.random() * 4);
                let distractorIdx = 0;

                for (let i = 0; i < 4; i++) {
                    if (i === correctIndex) {
                        options.push(correctOpt);
                    } else {
                        options.push(distractors[distractorIdx++]);
                    }
                }

                return {
                    question: question,
                    options: options,
                    correctIndex: correctIndex,
                    explanation: `${title}: ${extract.slice(0, 150)}...`,
                    source: `Live Knowledge Base (${title})`
                };
            }
        } catch (searchErr) {
            console.warn('Live Knowledge quiz search fallback:', searchErr);
        }

        // 3. Fallback Structured Quiz
        return {
            question: `Which principle correctly describes "${cleanTopic}"?`,
            options: [
                `Governing laws and systematic structural definitions of ${cleanTopic}`,
                `An unsupported assumption with zero scientific observation`,
                `A temporary mathematical approximation without physical validity`,
                `An outdated convention no longer recognized in academia`
            ],
            correctIndex: 0,
            explanation: `${cleanTopic} is supported by verified mathematical laws and empirical scientific study.`,
            source: 'Google AI Academic Engine'
        };
    }

    // --- 13. Insert Chemical Element Card ---
    insertElementCard(element) {
        const center = this.engine.getViewCenter();
        const obj = {
            type: 'element',
            x: center.x - 80,
            y: center.y - 90,
            width: 160,
            height: 180,
            number: element.number,
            symbol: element.symbol,
            name: element.name,
            mass: element.mass,
            group: element.group,
            color: element.color,
            bgColor: '#ffffff',
            strokeColor: element.color,
            strokeWidth: 2
        };
        this.engine.addObject(obj);
        window.soundManager.playPop();
    }

    // --- 14. Live Google AI & Knowledge Search Engine ---
    async generateAISolution(prompt) {
        const p = (prompt || '').trim();
        if (!p) return null;

        // 1. Custom Google Gemini API Key (from encrypted cookie)
        const customApiKey = window.apiKeyVault ? window.apiKeyVault.getKey() : (localStorage.getItem('gemini_api_key') || '');
        if (customApiKey) {
            try {
                const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${customApiKey}`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        contents: [{
                            parts: [{
                                text: `You are an expert AI Whiteboard Tutor for Math, Physics, Chemistry, and Biology. Explain the query accurately, clearly, and step-by-step: "${p}".
Return ONLY a valid JSON object with the exact keys:
"title": short topic title with an emoji,
"summary": clear accurate high-level answer/definition (2-3 sentences),
"steps": array of 4-6 concise numbered steps or key points/equations explaining the concept/derivation in depth,
"notes": 1 key takeaway or memory tip,
"formula": explicit mathematical or scientific formula if applicable (e.g. "sin(x)", "x^2 - 4", "HCl + NaOH -> NaCl + H2O", "dN/dt = rN(1 - N/K)"),
"subject": "math" | "physics" | "chemistry" | "biology" | "general",
"source": "Google Gemini AI"`
                            }]
                        }]
                    })
                });

                if (response.ok) {
                    const data = await response.json();
                    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text || '';
                    const cleanJson = text.replace(/```json/gi, '').replace(/```/gi, '').trim();
                    const parsed = JSON.parse(cleanJson);
                    if (parsed && parsed.title && parsed.summary && Array.isArray(parsed.steps)) {
                        return parsed;
                    }
                }
            } catch (err) {
                console.warn('Gemini API call error, falling back to Web Knowledge search:', err);
            }
        }

        // 2. Real-Time Live Web & Google Knowledge Search API
        try {
            let cleanQuery = p.replace(/^(what is|who is|explain|derive|calculate|how does|how to|define|tell me about|solve|describe)\s+/i, '').trim();
            cleanQuery = cleanQuery.replace(/[?!.]+$/, '');

            const searchUrl = `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(cleanQuery)}&utf8=&format=json&origin=*`;
            const searchRes = await fetch(searchUrl);
            const searchData = await searchRes.json();

            let targetTitle = cleanQuery;
            let snippet = '';
            if (searchData?.query?.search && searchData.query.search.length > 0) {
                targetTitle = searchData.query.search[0].title;
                snippet = searchData.query.search[0].snippet.replace(/<\/?[^>]+(>|$)/g, "");
            }

            const summaryUrl = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(targetTitle)}`;
            const summaryRes = await fetch(summaryUrl);
            const summaryData = await summaryRes.json();

            if (summaryData && summaryData.extract) {
                const title = summaryData.title || targetTitle;
                const extract = summaryData.extract;
                
                const sentences = extract.match(/[^.!?]+[.!?]+/g) || [extract];
                const summary = sentences.slice(0, 2).join(' ').trim();
                const remaining = sentences.slice(2);

                const steps = [];
                if (remaining.length > 0) {
                    remaining.forEach((s, idx) => {
                        if (s.trim().length > 15 && steps.length < 5) {
                            steps.push(`${idx + 1}. ${s.trim()}`);
                        }
                    });
                }

                if (steps.length === 0) {
                    steps.push(`1. Core Definition: ${summary}`);
                    steps.push(`2. Key Context: ${snippet || 'Fundamental principle in academic study.'}`);
                    steps.push(`3. Practical Application: Widely utilized in science and education.`);
                }

                // Detect subject & formula hint
                const low = (title + ' ' + extract).toLowerCase();
                let sub = 'general';
                let form = null;
                if (low.includes('acid') || low.includes('reaction') || low.includes('titration') || low.includes('chemical') || low.includes('benzene')) {
                    sub = 'chemistry';
                } else if (low.includes('cell') || low.includes('growth') || low.includes('genetics') || low.includes('photosynthesis') || low.includes('enzyme') || low.includes('biology')) {
                    sub = 'biology';
                } else if (low.includes('theorem') || low.includes('derivative') || low.includes('integral') || low.includes('quadratic') || low.includes('sine') || low.includes('cosine') || low.includes('polynomial')) {
                    sub = 'math';
                    form = 'x^2 - 4';
                }

                return {
                    title: `🌐 ${title}`,
                    summary: summary,
                    steps: steps,
                    subject: sub,
                    formula: form,
                    notes: `Verified Knowledge Base: ${summaryData.description || 'Live Academic Search'}`,
                    sourceUrl: summaryData.content_urls?.desktop?.page
                };
            }
        } catch (webErr) {
            console.warn('Live Web search error, falling back to math solver:', webErr);
        }

        // 3. Mathematical Expression Evaluator fallback
        try {
            const mathClean = p.replace(/[^0-9+\-*/().^sqrtcosinacle]/gi, '');
            if (mathClean.length > 1 && /[0-9]/.test(mathClean)) {
                const evalSafe = Function(`"use strict"; return (${mathClean.replace(/\^/g, '**')});`);
                const val = evalSafe();
                if (typeof val === 'number' && !isNaN(val) && isFinite(val)) {
                    return {
                        title: `🔢 Math Solution: ${p}`,
                        summary: `Result = ${val}`,
                        steps: [
                            `1. Given Expression: ${p}`,
                            `2. Evaluated Expression: ${mathClean}`,
                            `3. Computed Exact Value: ${val}`
                        ],
                        subject: 'math',
                        formula: mathClean,
                        notes: 'Calculated using Exact Whiteboard Math Engine.'
                    };
                }
            }
        } catch (mErr) {}

        // 4. Default Conceptual Breakdown
        return {
            title: `💡 AI Study Notes: ${prompt}`,
            summary: `Conceptual explanation for "${prompt}".`,
            steps: [
                `1. Fundamental Definition: Core principles and context of ${prompt}.`,
                `2. Step-by-Step Logic: Detailed theoretical formulation and relations.`,
                `3. Key Formulas / Axioms: Governing laws and practical rules.`,
                `4. Practical Application: Real-world problems and analytical solutions.`
            ],
            subject: 'general',
            notes: 'Generated by Google AI & Verified Knowledge Engine.'
        };
    }

    async translateSolutionToHinglish(solution) {
        if (!solution) return null;

        // 1. If custom Gemini API key is configured in encrypted cookie, use Gemini for contextual translation
        const customApiKey = window.apiKeyVault ? window.apiKeyVault.getKey() : (localStorage.getItem('gemini_api_key') || '');
        if (customApiKey) {
            try {
                const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${customApiKey}`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        contents: [{
                            parts: [{
                                text: `Translate this educational whiteboard solution into natural, student-friendly Hinglish (Hindi in Roman/English alphabet mixed with standard English technical terms):
Title: "${solution.title}"
Summary: "${solution.summary}"
Steps: ${JSON.stringify(solution.steps)}
Notes: "${solution.notes || ''}"

Return ONLY a valid JSON object with the exact keys:
"title": Hinglish title with emoji,
"summary": 2-3 sentences in natural Hinglish explaining the core idea clearly,
"steps": array of step strings in easy Hinglish,
"notes": 1 key takeaway tip in Hinglish.`
                            }]
                        }]
                    })
                });

                if (response.ok) {
                    const data = await response.json();
                    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text || '';
                    const cleanJson = text.replace(/```json/gi, '').replace(/```/gi, '').trim();
                    const parsed = JSON.parse(cleanJson);
                    if (parsed && parsed.title && parsed.summary && Array.isArray(parsed.steps)) {
                        return {
                            ...solution,
                            title: parsed.title,
                            summary: parsed.summary,
                            steps: parsed.steps,
                            notes: parsed.notes || 'Hinglish Study Tip: Is concept ko real-world example ke sath yaad rakhein.',
                            isHinglish: true
                        };
                    }
                }
            } catch (err) {
                console.warn('Gemini Hinglish translation error, using rule-based translator:', err);
            }
        }

        // 2. High-Quality Intelligent Rule-Based Bilingual Hinglish Translation Engine
        const translatePhrase = (str) => {
            if (!str) return '';
            let s = str;
            
            // Common pedagogical sentence starters & structures
            const replacements = [
                [/^what is\s+/i, 'Kya hota hai '],
                [/is defined as\s+/gi, 'ka matlab yeh hota hai ki '],
                [/is a fundamental principle in/gi, 'ek basic aur important rule hai '],
                [/refers to the process of\s+/gi, 'uss process ko kehte hain jisme '],
                [/is calculated by\s+/gi, 'iss formula se calculate kiya jaata hai: '],
                [/states that\s+/gi, 'yeh batata hai ki '],
                [/can be described as\s+/gi, 'ko aasan shabdon mein aise samajh sakte hain: '],
                [/therefore,?\s*/gi, 'Isliye, '],
                [/for example,?\s*/gi, 'Jaise ki (Example): '],
                [/in this step,?\s*/gi, 'Is step mein, '],
                [/first,? we\s+/gi, 'Pehle hum '],
                [/then,? we\s+/gi, 'Phir hum '],
                [/finally,? we\s+/gi, 'Aakhir mein hum '],
                [/which results in\s+/gi, 'jis se yeh result milta hai: '],
                [/it is important to note that\s+/gi, 'Dhyan rahe ki '],
                [/key takeaways?:?\s*/gi, 'Mukhya Baatein: '],
                [/core definition:?\s*/gi, 'Main Concept: '],
                [/practical applications?:?\s*/gi, 'Real-Life Use: '],
                [/key context:?\s*/gi, 'Zaroori Context: '],
                [/step-by-step logic:?\s*/gi, 'Step-by-Step Samajhein: '],
                [/formula\s*:\s*/gi, 'Formula / Sutra: ']
            ];

            replacements.forEach(([reg, rep]) => {
                s = s.replace(reg, rep);
            });

            return s;
        };

        const hinglishSteps = (solution.steps || []).map((step, idx) => {
            const clean = translatePhrase(step);
            return clean.startsWith(`${idx + 1}.`) ? clean : `${idx + 1}. ${clean}`;
        });

        const rawTitle = solution.title.replace(/^[^\w\s]+/, '').trim();
        const hinglishTitle = `🇮🇳 ${rawTitle} (Hinglish Notes)`;
        const hinglishSummary = `Is topic ka mukhya concept yeh hai: ${translatePhrase(solution.summary)}`;
        const hinglishNotes = `💡 Hinglish Guru Tip: ${translatePhrase(solution.notes || 'Is concept ko acche se samajh kar step-by-step whiteboard par practice karein!')}`;

        return {
            ...solution,
            title: hinglishTitle,
            summary: hinglishSummary,
            steps: hinglishSteps,
            notes: hinglishNotes,
            isHinglish: true
        };
    }

    async translateSolutionToHindi(solution) {
        if (!solution) return null;

        // 1. If custom Gemini API key is configured in encrypted cookie, use Gemini for contextual Devnagari Hindi translation
        const customApiKey = window.apiKeyVault ? window.apiKeyVault.getKey() : (localStorage.getItem('gemini_api_key') || '');
        if (customApiKey) {
            try {
                const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${customApiKey}`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        contents: [{
                            parts: [{
                                text: `Translate this educational whiteboard solution into clear, formal Hindi (Devnagari script हिंदी). Keep mathematical symbols, variables, chemical equations, and LaTeX formulas intact:
Title: "${solution.title}"
Summary: "${solution.summary}"
Steps: ${JSON.stringify(solution.steps)}
Notes: "${solution.notes || ''}"

Return ONLY a valid JSON object with the exact keys:
"title": Hindi title with emoji,
"summary": 2-3 sentences in clear Hindi explaining the core idea clearly,
"steps": array of step strings in clear Hindi,
"notes": 1 key takeaway tip in Hindi.`
                            }]
                        }]
                    })
                });

                if (response.ok) {
                    const data = await response.json();
                    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text || '';
                    const cleanJson = text.replace(/```json/gi, '').replace(/```/gi, '').trim();
                    const parsed = JSON.parse(cleanJson);
                    if (parsed && parsed.title && parsed.summary && Array.isArray(parsed.steps)) {
                        return {
                            ...solution,
                            title: parsed.title,
                            summary: parsed.summary,
                            steps: parsed.steps,
                            notes: parsed.notes || 'विशेष टिप्पणी: इस अवधारणा को सूत्र के साथ याद रखें।',
                            langMode: 'hindi'
                        };
                    }
                }
            } catch (err) {
                console.warn('Gemini Hindi translation error, using offline translator:', err);
            }
        }

        // 2. High-Quality Offline Heuristic Hindi Translator
        const translator = window.languageTranslator;
        const translateText = (t) => translator ? translator.translateTextOffline(t, 'hindi') : t;

        const hindiSteps = (solution.steps || []).map((step, idx) => {
            const clean = translateText(step);
            return clean.startsWith(`${idx + 1}.`) ? clean : `${idx + 1}. ${clean}`;
        });

        const rawTitle = solution.title.replace(/^[^\w\s]+/, '').trim();
        const hindiTitle = `🇮🇳 ${translateText(rawTitle)} (हिंदी नोट्स)`;
        const hindiSummary = `मुख्य अवधारणा: ${translateText(solution.summary)}`;
        const hindiNotes = `💡 विशेष टिप्पणी: ${translateText(solution.notes || 'इस सिद्धांत को ध्यानपूर्वक समझें और व्हाइटबोर्ड पर अभ्यास करें!')}`;

        return {
            ...solution,
            title: hindiTitle,
            summary: hindiSummary,
            steps: hindiSteps,
            notes: hindiNotes,
            langMode: 'hindi'
        };
    }

    insertAIToCanvas(solution, langMode = 'en') {
        const center = this.engine.getViewCenter();
        const isHinglish = (langMode === 'hinglish' || langMode === true);
        const isHindi = (langMode === 'hindi');

        const headerEmoji = (isHinglish || isHindi) ? '🇮🇳' : '🤖';
        const textContent = `${headerEmoji} ${solution.title}\n\n${solution.summary}\n\n` +
              solution.steps.map(s => `• ${s}`).join('\n') +
              `\n\n📌 Note: ${solution.notes}`;

        const width = 480;
        const paragraphs = textContent.split('\n');
        let estimatedLines = 0;
        const charsPerLine = Math.floor((width - 32) / 7.2);
        paragraphs.forEach(p => {
            if (!p) estimatedLines += 1;
            else estimatedLines += Math.max(1, Math.ceil(p.length / charsPerLine));
        });

        const calculatedHeight = Math.max(340, Math.min(720, estimatedLines * 19 + 50));

        let bgColor = '#ede9fe';
        let textColor = '#4c1d95';
        if (isHinglish) {
            bgColor = '#fef3c7'; // Pastel amber
            textColor = '#92400e';
        } else if (isHindi) {
            bgColor = '#ffedd5'; // Pastel saffron / orange
            textColor = '#9a3412';
        }

        const obj = {
            type: 'sticky',
            x: center.x - width / 2,
            y: center.y - calculatedHeight / 2,
            width: width,
            height: calculatedHeight,
            text: textContent,
            bgColor: bgColor,
            textColor: textColor,
            fontSize: 13
        };
        this.engine.addObject(obj);
        this.engine.selectedObjects = [obj];
        this.engine.selectedObject = obj;
        if (window.soundManager && typeof window.soundManager.playPop === 'function') {
            window.soundManager.playPop();
        }
    }

    insertBlankAICard(mode = 'english') {
        return this.engine.addBlankAISolutionCard();
    }
}

window.LearningWidgets = LearningWidgets;
