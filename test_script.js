const dom = require('jsdom');
const { JSDOM } = dom;

const html = `
<!DOCTYPE html>
<html>
<body>
    <form id="contactForm" novalidate>
        <div class="form-row">
            <div class="form-group"><label for="fullName">Full Name *</label><input type="text" id="fullName" name="fullName" placeholder="Enter your full name" required value="John Doe"></div>
            <div class="form-group"><label for="email">Email Address *</label><input type="email" id="email" name="email" placeholder="Enter your email address" required value="john@example.com"></div>
        </div>
        <div class="form-row">
            <div class="form-group">
                <label for="whatsapp">WhatsApp Number *</label>
                <div class="wa-input-wrap" style="width: 100%;">
                    <input type="tel" id="whatsapp" name="whatsapp_local" placeholder="WhatsApp Number" required value="1234567890">
                </div>
            </div>
            <div class="form-group"><label for="subjectArea">Subject Area *</label><input type="text" id="subjectArea" name="subjectArea" placeholder="Enter your subject area" required value="Science"></div>
        </div>
        <div class="form-group">
            <label>Indexing Preferences</label>
            <div class="checkbox-group">
                <label><input type="checkbox" name="indexing" value="Scopus"> Scopus</label>
            </div>
        </div>
        <div class="form-group"><label for="additionalInfo">Additional Information (max 50 words)</label><textarea id="additionalInfo" name="additionalInfo" placeholder="Tell us about your research or requirements..." rows="3"></textarea><div class="word-count" id="wordCount">0/50 words</div></div>
        <button type="submit" class="btn-submit">Send Message <i></i></button>
        <div class="form-success" id="formSuccess"></div>
    </form>
</body>
</html>
`;

const { window } = new JSDOM(html, { runScripts: "dangerously" });
global.window = window;
global.document = window.document;
global.FormData = window.FormData;
global.IntersectionObserver = class IntersectionObserver { constructor() {} observe() {} unobserve() {} disconnect() {} };
window.IntersectionObserver = global.IntersectionObserver;

const fs = require('fs');
const scriptContent = fs.readFileSync('script.js', 'utf-8');

try {
    window.eval(scriptContent);
    const form = window.document.getElementById('contactForm');
    
    // Simulate submission
    const event = new window.Event('submit', { cancelable: true });
    form.dispatchEvent(event);
    
    setTimeout(() => {
        console.log("Button disabled:", form.querySelector('.btn-submit').disabled);
        console.log("Success text:", window.document.getElementById('formSuccess').style.display);
    }, 100);
} catch (e) {
    console.error("Error:", e);
}
