// pdf-generator.js - Browser-side PDF Certificate Generator

window.generatePDFCertificate = function(animalData) {
    if (!animalData) return;

    // Create a temporary element for HTML rendering
    const element = document.createElement('div');
    element.style.padding = '30px';
    element.style.fontFamily = 'Georgia, serif';
    element.style.textAlign = 'center';
    element.style.border = '10px solid #d97706';
    element.style.backgroundColor = '#faf8f5';
    element.style.color = '#1e293b';

    element.innerHTML = `
        <div style="border: 2px solid #b45309; padding: 25px;">
            <h1 style="color: #b45309; font-size: 32px; margin-bottom: 5px;">OFFICIAL SPIRIT ANIMAL CERTIFICATE</h1>
            <p style="font-style: italic; color: #64748b; margin-top: 0;">Spirit Beast Nature Profile</p>
            <hr style="border: 0; border-top: 1px solid #cbd5e1; margin: 20px 0;">
            <p style="font-size: 16px;">This certifies that your core soul matches with:</p>
            <h2 style="font-size: 28px; color: #d97706; margin: 15px 0;">${animalData.title}</h2>
            <img src="${animalData.img}" style="width: 80%; height: 180px; object-fit: cover; border-radius: 8px; margin: 10px 0;">
            <p style="font-size: 14px; line-height: 1.6; max-width: 500px; margin: 15px auto; color: #334155;">${animalData.desc}</p>
            <div style="margin-top: 30px; font-size: 12px; color: #94a3b8;">Issued by Spirit Beast Nature Lab • ${new Date().toLocaleDateString()}</div>
        </div>
    `;

    const opt = {
        margin:       10,
        filename:     `Spirit_Animal_${animalData.key}.pdf`,
        image:        { type: 'jpeg', quality: 0.98 },
        html2canvas:  { scale: 2 },
        jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    html2pdf().set(opt).from(element).save();
};
