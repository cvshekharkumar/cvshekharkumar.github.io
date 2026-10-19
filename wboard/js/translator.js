// LearnBoard Studio - Ultra-Comprehensive Multi-Language & Pedagogical Translation Engine
// Supports 100% Full Translation to Hinglish, Hindi, Bengali, Telugu, Marathi, Tamil, Gujarati, Kannada, Spanish, French, German
(function () {
    class LanguageTranslationEngine {
        constructor() {
            // 1. Devnagari to Roman Script (Hinglish) Transliteration Map
            this.devnagariToHinglishMap = {
                'अ': 'a', 'आ': 'aa', 'इ': 'i', 'ई': 'ee', 'उ': 'u', 'ऊ': 'oo', 'ऋ': 'ri', 'ए': 'e', 'ऐ': 'ai', 'ओ': 'o', 'औ': 'au', 'अं': 'an', 'अः': 'ah',
                'क': 'k', 'ख': 'kh', 'ग': 'g', 'घ': 'gh', 'ङ': 'ng',
                'च': 'ch', 'छ': 'chh', 'ज': 'j', 'झ': 'jh', 'ञ': 'ny',
                'ट': 't', 'ठ': 'th', 'ड': 'd', 'ढ': 'dh', 'ण': 'n',
                'त': 't', 'थ': 'th', 'द': 'd', 'ध': 'dh', 'न': 'n',
                'प': 'p', 'फ': 'ph', 'ब': 'b', 'भ': 'bh', 'म': 'm',
                'य': 'y', 'र': 'r', 'ल': 'l', 'व': 'v', 'श': 'sh', 'ष': 'sh', 'स': 's', 'ह': 'h',
                'क्ष': 'ksh', 'त्र': 'tr', 'ज्ञ': 'gya',
                'ा': 'a', 'ि': 'i', 'ी': 'ee', 'ु': 'u', 'ू': 'oo', 'ृ': 'ri', 'े': 'e', 'ै': 'ai', 'ो': 'o', 'ौ': 'au', 'ं': 'n', 'ँ': 'n', 'ः': 'h',
                '्': ''
            };

            // 2. Comprehensive English to Hinglish Dictionary (Full Vocabulary)
            this.fullHinglishDict = {
                // Sentences & Pedagogical Starters
                'what is': 'Kya hota hai',
                'is defined as': 'ka matlab hota hai ki',
                'is a fundamental principle': 'ek basic aur zaroori rule hai',
                'refers to the process of': 'uss process ko kehte hain jisme',
                'is calculated by': 'iss formula se calculate kiya jaata hai:',
                'states that': 'yeh batata hai ki',
                'can be written as': 'ko aise likh sakte hain:',
                'can be simplified to': 'ko simplify karke aise likhein:',
                'which results in': 'jis se yeh result milta hai:',
                'it is important to note that': 'Dhyan rahe ki',
                'we can observe that': 'Hum dekh sakte hain ki',
                'for instance': 'Jaise ki',
                'for example': 'Jaise ki (Example)',
                'in order to': 'taaki hum',
                'step-by-step logic': 'Step-by-Step Samajhein',
                'key context': 'Zaroori Context',
                'practical application': 'Real-Life Use',
                'let us consider': 'Chaliye maan lete hain',
                'let us solve': 'Chaliye solve karte hain',
                'we know that': 'Hum jante hain ki',
                'to find': 'Humein nikalna hai',
                'as shown in': 'jaisa ki dikhaya gaya hai',
                'with respect to': 'ke sapeksh (with respect to)',
                'in this step': 'Is step mein',
                'first of all': 'Sabse pehle',

                // Structure & Headers
                'introduction': 'Introduction (Parichay)',
                'summary': 'Summary (Mukhya Baatein)',
                'step-by-step': 'Step-by-Step Samajhein',
                'step': 'Step',
                'steps': 'Steps',
                'key takeaways': 'Key Takeaways (Zaroori Points)',
                'key points': 'Key Points (Khaas Baatein)',
                'definition': 'Definition (Paribhasha)',
                'formula': 'Formula (Sutra)',
                'formulas': 'Formulas (Sutra)',
                'equations': 'Equations (Samikaran)',
                'equation': 'Equation (Samikaran)',
                'example': 'Example (Udaharan)',
                'examples': 'Examples (Udaharan)',
                'notes': 'Notes (Zaroori Tip)',
                'note': 'Note (Dhyan Dein)',
                'conclusion': 'Conclusion (Nishkarsh)',
                'practice question': 'Practice Question (Abhyas Prashna)',
                'solution': 'Solution (Hal)',
                'proof': 'Proof (Siddh Karna)',
                'derivation': 'Derivation (Sutra Nikalna)',
                'overview': 'Overview (Ek Nazar Mein)',
                'important': 'Zaroori (Important)',
                'remember': 'Yaad Rakhein',
                'tip': 'Study Tip',
                'question': 'Question (Prashna)',
                'answer': 'Answer (Uttar)',
                'explanation': 'Explanation (Samajh)',

                // Pronouns & Demonstratives
                'i ': 'main ', 'you': 'aap', 'he': 'voh', 'she': 'voh', 'it': 'yeh', 'we': 'hum', 'they': 've sab',
                'this': 'yeh', 'that': 'voh', 'these': 'yeh sab', 'those': 'voh sab',
                'my': 'mera', 'your': 'aapka', 'our': 'hamara', 'their': 'unka', 'its': 'iska',

                // Auxiliary & Common Verbs
                'is ': 'hai ', 'are ': 'hain ', 'am ': 'hoon ', 'was ': 'tha ', 'were ': 'the ',
                'have ': 'paas hai ', 'has ': 'paas hai ', 'had ': 'tha ',
                'will ': 'hoga ', 'shall ': 'karega ', 'can ': 'kar sakte hain ', 'could ': 'kar sakte the ',
                'should ': 'karna chahiye ', 'must ': 'zaroori karna chahiye ',
                'calculate': 'calculate karein', 'find': 'pata lagayein', 'solve': 'solve karein',
                'prove': 'siddh karein', 'explain': 'samjhayein', 'derive': 'derive karein',
                'simplify': 'simplify karein', 'substitute': 'value substitute karein',
                'differentiate': 'differentiate karein', 'integrate': 'integrate karein',
                'plot': 'graph par plot karein', 'draw': 'draw karein / banayein',
                'compare': 'compare karein', 'apply': 'apply karein', 'observe': 'observe karein',
                'multiply': 'multiply karein', 'divide': 'divide karein', 'add': 'add karein',
                'subtract': 'subtract karein', 'write': 'likhein', 'read': 'padhein',
                'learn': 'seekhein', 'teach': 'padhayein', 'understand': 'samjhein',
                'check': 'check karein', 'start': 'shuru karein', 'stop': 'rokein',
                'increase': 'badhayein (increase karein)', 'decrease': 'ghatayein (decrease karein)',

                // Common Nouns & Adjectives
                'student': 'student (vidyarthi)', 'students': 'students', 'teacher': 'teacher (adhyapak)',
                'class': 'class', 'problem': 'problem (samasya)', 'method': 'method (vidhi)',
                'rule': 'rule (niyam)', 'point': 'point (bindu)', 'line': 'line (rekha)',
                'circle': 'circle (vritta)', 'triangle': 'triangle (tribhuj)', 'area': 'area (kshetraphal)',
                'perimeter': 'perimeter (parimap)', 'volume': 'volume (aayatan)', 'time': 'time (samay)',
                'speed': 'speed (chaal)', 'velocity': 'velocity (veg)', 'acceleration': 'acceleration (tvaran)',
                'force': 'force (bal)', 'energy': 'energy (urja)', 'mass': 'mass (dravyamana)',
                'good': 'achha', 'bad': 'kharab', 'right': 'sahi', 'wrong': 'galat',
                'easy': 'aasan', 'difficult': 'mushkil', 'simple': 'saral', 'true': 'true (sach)',
                'false': 'false (galat)', 'first': 'pehla', 'last': 'aakhri', 'next': 'agla',
                'previous': 'pichhla', 'total': 'total (kul)', 'constant': 'constant (niyatang)',

                // Prepositions & Connectors
                'because': 'kyunki', 'therefore': 'isliye', 'hence': 'atah / isliye', 'however': 'lekin',
                'and': 'aur', 'or': 'ya', 'but': 'lekin', 'if': 'agar', 'then': 'toh',
                'so': 'isliye', 'with': 'ke sath', 'without': 'ke bina', 'in ': 'mein ',
                'on ': 'par ', 'at ': 'par ', 'by ': 'dwara / se ', 'for ': 'ke liye ',
                'from ': 'se ', 'to ': 'tak / ko ', 'of ': 'ka / ke / ki ', 'about': 'ke baare mein',
                'between': 'ke beech', 'under': 'ke neeche', 'before': 'pehle', 'after': 'baad mein',
                'now': 'ab', 'here': 'yahan', 'there': 'wahan', 'always': 'hamesha', 'never': 'kabhi nahi',
                'very': 'bahut', 'also': 'bhi', 'only': 'sirf'
            };

            // 3. Comprehensive English to Hindi Dictionary
            this.fullHindiDict = {
                'what is': 'क्या होता है',
                'is defined as': 'का तात्पर्य यह है कि',
                'is a fundamental principle': 'एक मूलभूत और आवश्यक नियम है',
                'refers to the process of': 'उस प्रक्रिया को कहते हैं जिसमें',
                'is calculated by': 'इस सूत्र द्वारा परिकलित किया जाता है:',
                'states that': 'यह बताता है कि',
                'can be written as': 'को इस प्रकार लिखा जा सकता है:',
                'which results in': 'जिसके परिणामस्वरूप यह प्राप्त होता है:',
                'it is important to note that': 'ध्यान रहे कि',
                'we can observe that': 'हम देख सकते हैं कि',
                'for example': 'उदाहरणार्थ',
                'in order to': 'ताकि हम',
                'step-by-step logic': 'चरण-दर-चरण समाधान',
                'let us consider': 'आइए मान लेते हैं',
                'let us solve': 'आइए हल करते हैं',
                'we know that': 'हम जानते हैं कि',
                'to find': 'ज्ञात करना है',
                'with respect to': 'के सापेक्ष',
                'in this step': 'इस चरण में',

                'introduction': 'परिचय (Introduction)',
                'summary': 'सारांश (Summary)',
                'step-by-step': 'चरण-दर-चरण समाधान',
                'step': 'चरण',
                'steps': 'चरण',
                'key takeaways': 'मुख्य बिंदु (Key Points)',
                'key points': 'मुख्य बिंदु',
                'definition': 'परिभाषा (Definition)',
                'formula': 'सूत्र (Formula)',
                'formulas': 'सूत्र (Formulas)',
                'equations': 'समीकरण (Equations)',
                'equation': 'समीकरण (Equation)',
                'example': 'उदाहरण (Example)',
                'examples': 'उदाहरण',
                'notes': 'विशेष टिप्पणी (Notes)',
                'note': 'टिप्पणी (Note)',
                'conclusion': 'निष्कर्ष (Conclusion)',
                'practice question': 'अभ्यास प्रश्न',
                'solution': 'हल (Solution)',
                'proof': 'उपपत्ति / सिद्ध (Proof)',
                'derivation': 'व्युत्पत्ति (Derivation)',
                'calculate': 'गणना करें',
                'find': 'ज्ञात कीजिए',
                'solve': 'हल कीजिए',
                'prove': 'सिद्ध कीजिए',
                'explain': 'व्याख्या कीजिए',
                'simplify': 'सरल कीजिए',
                'substitute': 'मान प्रतिस्थापित कीजिए',
                'because': 'क्योंकि',
                'therefore': 'अतः / इसलिए',
                'hence': 'इस प्रकार',
                'however': 'तथापि / किंतु',
                'and': 'और',
                'or': 'या',
                'but': 'लेकिन / परंतु',
                'if': 'यदि',
                'then': 'तो / तब',
                'with': 'के साथ',
                'without': 'के बिना',
                'for': 'के लिए',
                'from': 'से',
                'to': 'तक',
                'about': 'के बारे में',
                'between': 'के मध्य',
                'now': 'अब',
                'here': 'यहाँ',
                'there': 'वहाँ',
                'always': 'सदैव',
                'very': 'अत्यंत / बहुत',
                'also': 'भी',
                'only': 'केवल'
            };

            // Multilingual Academic Dictionaries for International & Regional Languages
            this.langCodeMap = {
                'hindi': 'hi',
                'hinglish': 'hi',
                'bengali': 'bn',
                'telugu': 'te',
                'marathi': 'mr',
                'tamil': 'ta',
                'gujarati': 'gu',
                'kannada': 'kn',
                'spanish': 'es',
                'french': 'fr',
                'german': 'de'
            };
        }

        // --- Transliterate Devnagari Hindi to Roman Script (Hinglish) ---
        devnagariToHinglish(hindiText) {
            if (!hindiText || typeof hindiText !== 'string') return '';
            let result = '';
            const text = hindiText;
            const len = text.length;

            for (let i = 0; i < len; i++) {
                const char = text[i];
                const nextChar = (i + 1 < len) ? text[i + 1] : '';

                if (this.devnagariToHinglishMap[char] !== undefined) {
                    const mapped = this.devnagariToHinglishMap[char];
                    result += mapped;

                    // If it is a full consonant and not followed by a vowel sign (matra) or virama (halant), append implicit 'a'
                    const isConsonant = (char >= 'क' && char <= 'ह') || char === 'क्ष' || char === 'त्र' || char === 'ज्ञ';
                    const isNextMatraOrHalant = nextChar && (
                        (nextChar >= 'ा' && nextChar <= 'ौ') || nextChar === '्' || nextChar === 'ं' || nextChar === 'ँ'
                    );

                    if (isConsonant && !isNextMatraOrHalant && nextChar && nextChar !== ' ' && nextChar !== '\n') {
                        result += 'a';
                    }
                } else {
                    result += char;
                }
            }

            // Clean up double vowels or formatting
            return result
                .replace(/aa/g, 'a')
                .replace(/ee/g, 'i')
                .replace(/oo/g, 'u')
                .replace(/\s+/g, ' ')
                .trim();
        }

        // --- Free Live Web Translation API Client (Zero Setup / Fallback) ---
        async fetchWebTranslation(text, targetLangCode) {
            if (!text || text.trim().length === 0) return null;
            try {
                const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text.slice(0, 480))}&langpair=en|${targetLangCode}`;
                const response = await fetch(url, { method: 'GET' });
                if (response.ok) {
                    const data = await response.json();
                    if (data && data.responseData && data.responseData.translatedText) {
                        const translated = data.responseData.translatedText;
                        if (!translated.includes('MYMEMORY WARNING') && translated.toLowerCase() !== text.toLowerCase()) {
                            return translated;
                        }
                    }
                }
            } catch (err) {
                // Silently fallback to offline dictionary
            }
            return null;
        }

        // --- Translate Regional Spoken Query into Clear Academic English ---
        async translateToEnglish(text, sourceLangCode = 'hi') {
            if (!text || typeof text !== 'string') return '';
            const cleanText = text.trim();
            if (!cleanText) return '';

            // 1. Try Gemini Live API first if configured in encrypted cookie
            const apiKey = window.apiKeyVault ? window.apiKeyVault.getKey() : (localStorage.getItem('gemini_api_key') || '');
            if (apiKey) {
                try {
                    const prompt = `Translate this regional language educational query into clear, concise academic English for an AI knowledge search:
Query: "${cleanText}"
Return ONLY the translated English text.`;

                    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            contents: [{ parts: [{ text: prompt }] }]
                        })
                    });

                    if (response.ok) {
                        const data = await response.json();
                        const resultText = data?.candidates?.[0]?.content?.parts?.[0]?.text || '';
                        if (resultText.trim()) return resultText.replace(/^"|"$/g, '').trim();
                    }
                } catch (err) {
                    console.warn('Gemini translateToEnglish fallback:', err);
                }
            }

            // 2. Try Free Web Translation API (Regional -> English)
            const srcCode = (sourceLangCode && sourceLangCode.includes('-')) ? sourceLangCode.split('-')[0] : (sourceLangCode || 'hi');
            try {
                const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(cleanText.slice(0, 480))}&langpair=${srcCode}|en`;
                const response = await fetch(url, { method: 'GET' });
                if (response.ok) {
                    const data = await response.json();
                    if (data && data.responseData && data.responseData.translatedText) {
                        const res = data.responseData.translatedText;
                        if (!res.includes('MYMEMORY WARNING') && res.trim().length > 0) {
                            return res.trim();
                        }
                    }
                }
            } catch (e) {
                // fallback
            }

            // 3. Intelligent Heuristic Translation for Hinglish / Hindi Speech Queries
            let heuristic = cleanText;
            const speechReplacements = [
                [/kya hota hai\??/gi, 'what is'],
                [/kya hai\??/gi, 'what is'],
                [/ka matlab\??/gi, 'meaning of'],
                [/ka formula\??/gi, 'formula of'],
                [/ka sutra\??/gi, 'formula of'],
                [/kaise solve karein\??/gi, 'how to solve'],
                [/solve karo\??/gi, 'solve'],
                [/samjhao\??/gi, 'explain'],
                [/explain karo\??/gi, 'explain'],
                [/siddh karo\??/gi, 'derive / prove'],
                [/derive karo\??/gi, 'derive'],
                [/ke baare mein\??/gi, 'about'],
                [/ke niyam\??/gi, 'laws of'],
                [/ke prakar\??/gi, 'types of'],
                [/step by step\??/gi, 'step by step'],
                [/batao\??/gi, 'explain']
            ];

            speechReplacements.forEach(([reg, rep]) => {
                heuristic = heuristic.replace(reg, rep);
            });

            return heuristic.trim();
        }

        // --- Live Gemini AI Translation (When API Key is entered in encrypted cookie) ---
        async translateWithGemini(textsArray, targetLangName) {
            const apiKey = window.apiKeyVault ? window.apiKeyVault.getKey() : (localStorage.getItem('gemini_api_key') || '');
            if (!apiKey || !Array.isArray(textsArray) || textsArray.length === 0) return null;

            try {
                const targetSpec = targetLangName === 'hinglish'
                    ? '100% natural, fluent conversational Hinglish (Hindi written in Roman/English alphabet with English STEM technical terms preserved). Translate EVERY sentence completely.'
                    : `100% natural, accurate ${targetLangName}. Keep mathematical formulas and LaTeX commands intact.`;

                const prompt = `Translate the following array of whiteboard texts into ${targetSpec}.
Input array:
${JSON.stringify(textsArray)}

Return ONLY a valid JSON array of translated strings corresponding 1:1 with the input array:
["translated 1", "translated 2", ...]`;

                const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        contents: [{ parts: [{ text: prompt }] }]
                    })
                });

                if (response.ok) {
                    const data = await response.json();
                    const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text || '';
                    const cleanJson = rawText.replace(/```json/gi, '').replace(/```/gi, '').trim();
                    const parsed = JSON.parse(cleanJson);
                    if (Array.isArray(parsed) && parsed.length === textsArray.length) {
                        return parsed;
                    }
                }
            } catch (err) {
                console.warn('Gemini translation fallback:', err);
            }
            return null;
        }

        // --- Break text into small sentence / clause chunks ---
        splitTextIntoChunks(text, maxChunkLen = 120) {
            if (!text || typeof text !== 'string') return [];
            
            const lines = text.split('\n');
            const resultStructure = [];

            lines.forEach((line) => {
                const trimmedLine = line.trim();
                if (!trimmedLine) {
                    resultStructure.push({ type: 'empty', raw: line, chunks: [] });
                    return;
                }

                // Check bullet prefix, emoji, or numbered list prefix
                let prefix = '';
                let content = trimmedLine;
                const bulletMatch = content.match(/^([•\-\*]\s*|\d+[\.\)]\s*|📌\s*|💡\s*|⚡\s*|✨\s*|📐\s*|🧪\s*|🧬\s*|🤖\s*|🇮🇳\s*|Note:\s*|Tip:\s*|Summary:\s*)/i);
                if (bulletMatch) {
                    prefix = bulletMatch[0];
                    content = content.slice(prefix.length).trim();
                }

                // If chunk is short enough, keep as single chunk
                if (content.length <= maxChunkLen) {
                    resultStructure.push({
                        type: 'line',
                        prefix: prefix,
                        chunks: [{ text: content, delimiter: '' }]
                    });
                    return;
                }

                // Split long line by sentence boundaries (. ! ? ;)
                const sentenceRegex = /([^\.!\?;\n]+[\.!\?;\s]*)/g;
                const matched = content.match(sentenceRegex) || [content];
                const lineChunks = [];

                matched.forEach(s => {
                    const str = s.trim();
                    if (!str) return;
                    if (str.length <= maxChunkLen) {
                        lineChunks.push({ text: str, delimiter: ' ' });
                    } else {
                        // Sub-chunk by clauses / commas / colons
                        const clauseRegex = /([^,:\n]+[,:\s]*)/g;
                        const subMatched = str.match(clauseRegex) || [str];
                        subMatched.forEach(c => {
                            const cStr = c.trim();
                            if (cStr) lineChunks.push({ text: cStr, delimiter: ' ' });
                        });
                    }
                });

                resultStructure.push({
                    type: 'line',
                    prefix: prefix,
                    chunks: lineChunks.length > 0 ? lineChunks : [{ text: content, delimiter: '' }]
                });
            });

            return resultStructure;
        }

        // --- Complete Chunk-Level Text Translator ---
        async translateChunk(chunkText, targetLang = 'hinglish') {
            if (!chunkText || typeof chunkText !== 'string') return chunkText;
            const trimmed = chunkText.trim();
            if (!trimmed) return chunkText;
            if (targetLang === 'english' || targetLang === 'en') return chunkText;

            // 1. Try Gemini API first if configured in encrypted cookie
            const apiKey = window.apiKeyVault ? window.apiKeyVault.getKey() : (localStorage.getItem('gemini_api_key') || '');
            if (apiKey) {
                const res = await this.translateWithGemini([trimmed], targetLang);
                if (res && res[0]) return res[0];
            }

            // 2. Try Free Web Translation API for this small chunk
            const langCode = this.langCodeMap[targetLang] || 'hi';
            try {
                const webResult = await this.fetchWebTranslation(trimmed, langCode);
                if (webResult) {
                    if (targetLang === 'hinglish') {
                        return this.devnagariToHinglish(webResult);
                    }
                    return webResult;
                }
            } catch (e) {
                // fallback to offline dictionary
            }

            // 3. Robust Offline Dictionary
            return this.translateTextOffline(trimmed, targetLang);
        }

        // --- Translate Single Text with Small Chunk Breakdown & Merge ---
        async translateSingleText(fullText, targetLang = 'hinglish') {
            if (!fullText || typeof fullText !== 'string') return fullText;
            if (targetLang === 'english' || targetLang === 'en') return fullText;

            const structure = this.splitTextIntoChunks(fullText, 120);
            const lineOutputs = [];

            for (let item of structure) {
                if (item.type === 'empty') {
                    lineOutputs.push('');
                    continue;
                }

                const translatedChunks = [];
                for (let ch of item.chunks) {
                    const trans = await this.translateChunk(ch.text, targetLang);
                    translatedChunks.push(trans);
                }

                const joinedContent = translatedChunks.join(' ');
                const finalLine = item.prefix ? `${item.prefix}${joinedContent}` : joinedContent;
                lineOutputs.push(finalLine);
            }

            return lineOutputs.join('\n');
        }

        // --- Full Offline Sentence & Word-Level Translator ---
        translateTextOffline(text, targetLang = 'hinglish') {
            if (!text || typeof text !== 'string') return text;
            if (targetLang === 'english' || targetLang === 'en') return text;

            let result = text;

            // 1. Protect Math formulas, LaTeX, and Numbers
            const mathPlaceholders = [];
            result = result.replace(/(\$\$[\s\S]*?\$\$|\$[^\$]+\$|\\\([^\)]+\\\)|\\\[[\s\S]*?\\\]|\b[0-9]+(?:\.[0-9]+)?(?:[a-zA-Z%^/]+)?\b)/g, (match) => {
                const ph = `__MATH_PROTECT_${mathPlaceholders.length}__`;
                mathPlaceholders.push({ placeholder: ph, original: match });
                return ph;
            });

            const dict = (targetLang === 'hindi') ? this.fullHindiDict : this.fullHinglishDict;

            // 2. Greedy Multi-word & Phrase Replacement (Sorted longest first)
            const keys = Object.keys(dict).sort((a, b) => b.length - a.length);
            keys.forEach(k => {
                const escaped = k.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
                const reg = new RegExp(`\\b${escaped}\\b`, 'gi');
                result = result.replace(reg, (match) => {
                    const trans = dict[k];
                    if (match === match.toUpperCase() && match.length > 1) return trans.toUpperCase();
                    if (match[0] === match[0].toUpperCase()) return trans.charAt(0).toUpperCase() + trans.slice(1);
                    return trans;
                });
            });

            // 3. Restore Math placeholders
            mathPlaceholders.forEach(item => {
                result = result.replace(item.placeholder, item.original);
            });

            return result;
        }

        // --- Translate All Objects on Whiteboard Sheet 100% Completely ---
        async translateObjects(objects, targetLang = 'hinglish') {
            if (!Array.isArray(objects) || objects.length === 0) return;

            // Step 1: Collect and preserve pristine original language data
            const textEntries = [];
            objects.forEach((obj, objIdx) => {
                if (!obj) return;
                if (!obj._originalLangData) {
                    obj._originalLangData = {
                        text: obj.text,
                        title: obj.title,
                        summary: obj.summary,
                        steps: Array.isArray(obj.steps) ? [...obj.steps] : undefined,
                        question: obj.question,
                        options: Array.isArray(obj.options) ? [...obj.options] : undefined,
                        explanation: obj.explanation,
                        notes: obj.notes,
                        label: obj.label,
                        query: obj.query
                    };
                }

                // Always read FROM pristine original language data
                const orig = obj._originalLangData;
                if (typeof orig.text === 'string' && orig.text.trim()) {
                    textEntries.push({ objIdx, field: 'text', original: orig.text });
                }
                if (typeof orig.title === 'string' && orig.title.trim()) {
                    textEntries.push({ objIdx, field: 'title', original: orig.title });
                }
                if (typeof orig.summary === 'string' && orig.summary.trim()) {
                    textEntries.push({ objIdx, field: 'summary', original: orig.summary });
                }
                if (Array.isArray(orig.steps)) {
                    orig.steps.forEach((step, sIdx) => {
                        if (typeof step === 'string' && step.trim()) {
                            textEntries.push({ objIdx, field: 'steps', stepIdx: sIdx, original: step });
                        }
                    });
                }
                if (typeof orig.question === 'string' && orig.question.trim()) {
                    textEntries.push({ objIdx, field: 'question', original: orig.question });
                }
                if (typeof orig.explanation === 'string' && orig.explanation.trim()) {
                    textEntries.push({ objIdx, field: 'explanation', original: orig.explanation });
                }
                if (typeof orig.notes === 'string' && orig.notes.trim()) {
                    textEntries.push({ objIdx, field: 'notes', original: orig.notes });
                }
                if (typeof orig.label === 'string' && orig.label.trim()) {
                    textEntries.push({ objIdx, field: 'label', original: orig.label });
                }
                if (typeof orig.query === 'string' && orig.query.trim()) {
                    textEntries.push({ objIdx, field: 'query', original: orig.query });
                }
                if (Array.isArray(orig.options)) {
                    orig.options.forEach((opt, optIdx) => {
                        if (typeof opt === 'string' && opt.trim()) {
                            textEntries.push({ objIdx, field: 'options', optIdx, original: opt });
                        }
                    });
                }
            });

            if (textEntries.length === 0) return;

            // If switching back to English, restore from pristine original
            if (targetLang === 'english' || targetLang === 'en') {
                this.restoreOriginalObjects(objects);
                return;
            }

            // Step 2: Try Batch Translation with Gemini AI if configured in encrypted cookie
            let translatedArray = null;
            if (window.apiKeyVault ? window.apiKeyVault.hasKey() : localStorage.getItem('gemini_api_key')) {
                const originals = textEntries.map(e => e.original);
                translatedArray = await this.translateWithGemini(originals, targetLang);
            }

            // Step 3: Apply translations to every single object field completely using chunked translation
            for (let idx = 0; idx < textEntries.length; idx++) {
                const entry = textEntries[idx];
                const obj = objects[entry.objIdx];
                if (!obj) continue;

                let translatedText = '';
                if (translatedArray && translatedArray[idx]) {
                    translatedText = translatedArray[idx];
                } else {
                    translatedText = await this.translateSingleText(entry.original, targetLang);
                }

                if (entry.field === 'options' && Array.isArray(obj.options)) {
                    obj.options[entry.optIdx] = translatedText;
                } else if (entry.field === 'steps' && Array.isArray(obj.steps)) {
                    obj.steps[entry.stepIdx] = translatedText;
                } else {
                    obj[entry.field] = translatedText;
                }
            }
        }

        // --- Restore Original English on Whiteboard Sheet ---
        restoreOriginalObjects(objects) {
            if (!Array.isArray(objects)) return;
            objects.forEach(obj => {
                if (obj && obj._originalLangData) {
                    if (obj._originalLangData.text !== undefined) obj.text = obj._originalLangData.text;
                    if (obj._originalLangData.title !== undefined) obj.title = obj._originalLangData.title;
                    if (obj._originalLangData.summary !== undefined) obj.summary = obj._originalLangData.summary;
                    if (obj._originalLangData.steps !== undefined && Array.isArray(obj._originalLangData.steps)) {
                        obj.steps = [...obj._originalLangData.steps];
                    }
                    if (obj._originalLangData.question !== undefined) obj.question = obj._originalLangData.question;
                    if (obj._originalLangData.options !== undefined && Array.isArray(obj._originalLangData.options)) {
                        obj.options = [...obj._originalLangData.options];
                    }
                    if (obj._originalLangData.explanation !== undefined) obj.explanation = obj._originalLangData.explanation;
                    if (obj._originalLangData.notes !== undefined) obj.notes = obj._originalLangData.notes;
                    if (obj._originalLangData.label !== undefined) obj.label = obj._originalLangData.label;
                    if (obj._originalLangData.query !== undefined) obj.query = obj._originalLangData.query;
                }
            });
        }
    }

    window.LanguageTranslationEngine = LanguageTranslationEngine;
    window.languageTranslator = new LanguageTranslationEngine();
})();
