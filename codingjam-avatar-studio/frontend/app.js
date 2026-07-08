const heroArea = document.getElementById('hero-area');
const fileInput = document.getElementById('file-input');
const previewImage = document.getElementById('preview-image');
const promptText = document.getElementById('prompt-text');
const scanningLaser = document.getElementById('scanning-laser');
const styleBtns = document.querySelectorAll('.style-btn');
const postActions = document.getElementById('post-actions');
const cropControls = document.getElementById('crop-controls');
const ratioBtns = document.querySelectorAll('.ratio-btn');
const confirmCropBtn = document.getElementById('confirm-crop-btn');
const actionBar = document.getElementById('action-bar');

let currentBase64 = null;
let cropper = null;

heroArea.addEventListener('click', () => {
    if (cropper) return; // Prevent file dialog when cropping
    fileInput.click();
});

fileInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
            currentBase64 = event.target.result;
            previewImage.src = currentBase64;
            previewImage.style.display = 'block';
            promptText.style.display = 'none';
            heroArea.classList.remove('empty');
            heroArea.style.border = 'none';
            
            if (cropper) {
                cropper.destroy();
            }
            cropper = new Cropper(previewImage, {
                aspectRatio: 1,
                viewMode: 1,
            });
            
            cropControls.style.display = 'flex';
            actionBar.style.display = 'none';
            postActions.style.display = 'none';
            styleBtns.forEach(btn => btn.classList.remove('active-options'));
        };
        reader.readAsDataURL(file);
    }
});

ratioBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        ratioBtns.forEach(b => b.classList.remove('active'));
        e.target.classList.add('active');
        const ratio = parseFloat(e.target.dataset.ratio);
        if (cropper) {
            cropper.setAspectRatio(isNaN(ratio) ? NaN : ratio);
        }
    });
});

confirmCropBtn.addEventListener('click', () => {
    if (cropper) {
        const canvas = cropper.getCroppedCanvas();
        currentBase64 = canvas.toDataURL('image/jpeg');
        
        cropper.destroy();
        cropper = null;
        
        previewImage.src = currentBase64;
        cropControls.style.display = 'none';
        actionBar.style.display = 'grid';
        styleBtns.forEach(btn => btn.classList.add('active-options'));
    }
});

async function generateAvatar(styleId) {
    if (!currentBase64) {
        heroArea.style.transform = 'translateX(-10px)';
        setTimeout(() => heroArea.style.transform = 'translateX(10px)', 100);
        setTimeout(() => heroArea.style.transform = 'translateX(0)', 200);
        return;
    }

    // Start loading state
    scanningLaser.style.display = 'block';
    styleBtns.forEach(btn => btn.style.opacity = '0.5');
    postActions.style.display = 'none';

    try {
        const response = await fetch('/api/generate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                styleId: styleId,
                imageBase64: currentBase64
            })
        });

        const data = await response.json();
        if (response.ok && data.success && data.avatarBase64) {
            previewImage.src = data.avatarBase64;
            postActions.style.display = 'flex';
        } else {
            alert(data.detail || data.error || 'Generation failed');
        }
    } catch (err) {
        alert('Network error');
    } finally {
        scanningLaser.style.display = 'none';
        styleBtns.forEach(btn => btn.classList.contains('active-options') ? btn.style.opacity = '1' : null);
    }
}

styleBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        const styleId = e.target.getAttribute('data-style');
        generateAvatar(styleId);
    });
});
