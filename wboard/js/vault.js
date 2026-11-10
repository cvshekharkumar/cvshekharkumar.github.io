/**
 * WBoard API Key Encryption & Web Cookie Vault
 * Securely encrypts and stores API keys in web cookies with client-side decryption.
 */
(function() {
    'use strict';

    const COOKIE_NAME = 'wboard_encrypted_gemini_api_key';
    const CIPHER_SALT = 'WBoard_Gemini_AI_Key_Vault_v2026_@982$';
    const PREFIX = 'ENC_V1:';

    const apiKeyVault = {
        COOKIE_NAME,
        CIPHER_SALT,

        /**
         * Reversible salted XOR stream cipher with UTF-8 support and Base64 encoding.
         */
        encrypt(text) {
            if (!text || typeof text !== 'string') return '';
            try {
                const payload = PREFIX + text;
                // Encode UTF-8 string to byte-safe string
                const utf8Str = unescape(encodeURIComponent(payload));
                let encrypted = '';
                for (let i = 0; i < utf8Str.length; i++) {
                    const charCode = utf8Str.charCodeAt(i) ^ CIPHER_SALT.charCodeAt(i % CIPHER_SALT.length);
                    encrypted += String.fromCharCode(charCode);
                }
                return btoa(encrypted);
            } catch (err) {
                console.error('API Key Encryption error:', err);
                return btoa(PREFIX + text);
            }
        },

        /**
         * Decrypt cipher string from Base64 and salted XOR stream cipher.
         */
        decrypt(cipher) {
            if (!cipher || typeof cipher !== 'string') return '';
            try {
                const decoded = atob(cipher);
                let decrypted = '';
                for (let i = 0; i < decoded.length; i++) {
                    const charCode = decoded.charCodeAt(i) ^ CIPHER_SALT.charCodeAt(i % CIPHER_SALT.length);
                    decrypted += String.fromCharCode(charCode);
                }
                const utf8Decoded = decodeURIComponent(escape(decrypted));
                if (utf8Decoded.startsWith(PREFIX)) {
                    return utf8Decoded.slice(PREFIX.length);
                }
                // Fallback check
                if (decrypted.startsWith(PREFIX)) {
                    return decrypted.slice(PREFIX.length);
                }
                return '';
            } catch (err) {
                // Fallback attempt for standard Base64
                try {
                    const fallback = atob(cipher);
                    if (fallback.startsWith(PREFIX)) return fallback.slice(PREFIX.length);
                } catch(e) {}
                return '';
            }
        },

        /**
         * Save API key into encrypted web cookie.
         */
        saveKey(key, days = 60) {
            const cleanKey = (key || '').trim();
            if (!cleanKey) {
                this.removeKey();
                return false;
            }
            const encrypted = this.encrypt(cleanKey);
            const maxAge = days * 24 * 60 * 60;
            const expiresDate = new Date(Date.now() + maxAge * 1000).toUTCString();
            
            // Set cookie with SameSite and path
            document.cookie = `${COOKIE_NAME}=${encodeURIComponent(encrypted)}; expires=${expiresDate}; max-age=${maxAge}; path=/; SameSite=Lax`;
            
            // Wipe unencrypted copy from localStorage for enhanced privacy
            try {
                localStorage.removeItem('gemini_api_key');
            } catch (e) {}

            return true;
        },

        /**
         * Read and decrypt API key from web cookie.
         */
        getKey() {
            // 1. Read from document.cookie
            const cookies = document.cookie.split(';');
            for (let i = 0; i < cookies.length; i++) {
                const c = cookies[i].trim();
                if (c.indexOf(COOKIE_NAME + '=') === 0) {
                    const rawVal = decodeURIComponent(c.substring(COOKIE_NAME.length + 1));
                    const decrypted = this.decrypt(rawVal);
                    if (decrypted && decrypted.trim()) {
                        return decrypted.trim();
                    }
                }
            }

            // 2. Legacy Migration Fallback: If found in localStorage, encrypt into cookie and remove unencrypted copy
            try {
                const legacy = localStorage.getItem('gemini_api_key');
                if (legacy && legacy.trim()) {
                    this.saveKey(legacy.trim());
                    return legacy.trim();
                }
            } catch (e) {}

            return '';
        },

        /**
         * Check if a valid decrypted API key is available.
         */
        hasKey() {
            const key = this.getKey();
            return !!(key && key.trim().length > 0);
        },

        /**
         * Remove API key from web cookies and storage.
         */
        removeKey() {
            document.cookie = `${COOKIE_NAME}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; max-age=0; path=/; SameSite=Lax`;
            document.cookie = `${COOKIE_NAME}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; max-age=0; path=/; domain=${window.location.hostname}; SameSite=Lax`;
            try {
                localStorage.removeItem('gemini_api_key');
            } catch (e) {}
        },

        /**
         * Interactive dialog/modal to prompt user for API key when needed.
         * Returns a Promise that resolves to the API key string (or empty string if skipped).
         */
        promptKey(actionTitle = 'Google Gemini AI Feature', reason = '') {
            return new Promise((resolve) => {
                const existingKey = this.getKey();
                if (existingKey) {
                    resolve(existingKey);
                    return;
                }

                // Remove existing prompt modal if present
                const existingModal = document.getElementById('apiKeyPromptModal');
                if (existingModal) existingModal.remove();

                const modalHtml = `
                    <div id="apiKeyPromptModal" class="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-4 transition-opacity">
                        <div class="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-indigo-200 dark:border-indigo-800/80 max-w-md w-full p-5 space-y-4 text-slate-800 dark:text-slate-100 animate-in fade-in zoom-in duration-200">
                            <div class="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                                <div class="flex items-center gap-2.5">
                                    <span class="w-9 h-9 rounded-xl bg-indigo-100 dark:bg-indigo-950/70 text-indigo-600 dark:text-indigo-400 flex items-center justify-center text-base shadow-xs">
                                        🔑
                                    </span>
                                    <div>
                                        <h3 class="text-sm font-bold text-slate-900 dark:text-white">Gemini API Key Required</h3>
                                        <p class="text-[11px] text-slate-500 dark:text-slate-400">${actionTitle}</p>
                                    </div>
                                </div>
                                <button id="btn-close-api-modal" type="button" title="Close" class="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1.5 rounded-lg text-sm">
                                    <i class="fa-solid fa-xmark"></i>
                                </button>
                            </div>

                            <p class="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                                ${reason || 'To generate real-time AI solutions, quizzes, and live multilingual translations with Google Gemini, please enter your API key.'}
                            </p>

                            <div class="space-y-2">
                                <div class="flex items-center justify-between">
                                    <label for="modal-api-key-input" class="block text-[11px] font-semibold text-slate-700 dark:text-slate-300">
                                        Google Gemini API Key:
                                    </label>
                                    <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noopener noreferrer" class="text-[11px] font-bold text-indigo-600 dark:text-indigo-400 hover:underline inline-flex items-center gap-1" title="Get free Google Gemini API Key">
                                        <span>Get API Key Free ↗</span>
                                    </a>
                                </div>
                                <div class="relative">
                                    <input type="password" id="modal-api-key-input" placeholder="Enter AIzaSy... API key" class="w-full pl-3 pr-10 py-2.5 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 outline-none focus:ring-2 focus:ring-indigo-500 font-mono">
                                    <button type="button" id="btn-toggle-modal-key-vis" title="Toggle visibility" class="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 text-xs p-1">
                                        <i class="fa-solid fa-eye"></i>
                                    </button>
                                </div>
                                <div class="flex items-center gap-1.5 text-[10px] text-emerald-600 dark:text-emerald-400">
                                    <i class="fa-solid fa-shield-halved text-[10px]"></i>
                                    <span>Key is encrypted client-side and saved in web cookies.</span>
                                </div>
                            </div>

                            <div class="pt-2 flex flex-col sm:flex-row items-center justify-end gap-2">
                                <button id="btn-modal-skip-fallback" type="button" class="w-full sm:w-auto px-3 py-2 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition">
                                    Continue with Free Search
                                </button>
                                <button id="btn-modal-save-api" type="button" class="w-full sm:w-auto px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white text-xs font-bold rounded-xl shadow-md shadow-indigo-500/25 transition flex items-center justify-center gap-1.5">
                                    <i class="fa-solid fa-lock text-xs"></i>
                                    <span>Encrypt & Save Key</span>
                                </button>
                            </div>
                        </div>
                    </div>
                `;

                document.body.insertAdjacentHTML('beforeend', modalHtml);

                const modalEl = document.getElementById('apiKeyPromptModal');
                const inputEl = document.getElementById('modal-api-key-input');
                const toggleVisBtn = document.getElementById('btn-toggle-modal-key-vis');
                const saveBtn = document.getElementById('btn-modal-save-api');
                const skipBtn = document.getElementById('btn-modal-skip-fallback');
                const closeBtn = document.getElementById('btn-close-api-modal');

                let isPassword = true;
                toggleVisBtn?.addEventListener('click', () => {
                    isPassword = !isPassword;
                    inputEl.type = isPassword ? 'password' : 'text';
                    toggleVisBtn.innerHTML = isPassword ? '<i class="fa-solid fa-eye"></i>' : '<i class="fa-solid fa-eye-slash"></i>';
                });

                const closeModal = () => {
                    modalEl?.remove();
                };

                closeBtn?.addEventListener('click', () => {
                    closeModal();
                    resolve('');
                });

                skipBtn?.addEventListener('click', () => {
                    closeModal();
                    resolve('');
                });

                const handleSave = () => {
                    const keyVal = (inputEl.value || '').trim();
                    if (keyVal) {
                        apiKeyVault.saveKey(keyVal);
                        if (window.showToast) {
                            window.showToast('🔒 API Key Encrypted & Stored in Web Cookie!');
                        }
                        // Update UI input in drawer if present
                        const drawerInput = document.getElementById('gemini-key-input');
                        if (drawerInput) drawerInput.value = keyVal;
                        
                        const statusBadge = document.getElementById('api-key-status-badge');
                        if (statusBadge) {
                            statusBadge.textContent = '🔒 Saved in Cookie (Encrypted)';
                            statusBadge.className = 'text-[10px] px-2 py-0.5 rounded-full font-semibold bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300';
                        }
                    }
                    closeModal();
                    resolve(keyVal);
                };

                saveBtn?.addEventListener('click', handleSave);
                inputEl?.addEventListener('keydown', (e) => {
                    if (e.key === 'Enter') {
                        e.preventDefault();
                        handleSave();
                    }
                });

                inputEl?.focus();
            });
        }
    };

    // Expose to window
    window.apiKeyVault = apiKeyVault;

})();
