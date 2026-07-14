const emojis = ["🌸", "✨", "🎨", "👾", "🌙", "🍕", "🎈", "🐱", "🚀", "🎸", "🥑", "🔮"];

const matrixGrid = document.getElementById('matrixGrid');
const magicBtn = document.getElementById('magicBtn');
const hideBtn = document.getElementById('hideBtn');
const bgSound = document.getElementById('bgSound');

const totalRows = 6;
const totalCols = 8;
const totalStickers = totalRows * totalCols;
let stickersArray = [];
let canClickBackground = true;

for (let i = 0; i < totalStickers; i++) {
    const sticker = document.createElement('div');
    sticker.className = "bg-white/10 backdrop-blur-md border border-white/20 rounded-xl flex justify-center items-center text-3xl shadow-[0_8px_32px_0_rgba(31,38,135,0.2)] opacity-0 scale-50 transition-all duration-700 ease-[cubic-bezier(0.175,0.885,0.32,1.275)]";
    sticker.innerText = emojis[Math.floor(Math.random() * emojis.length)];
    matrixGrid.appendChild(sticker);
    stickersArray.push(sticker);
}

magicBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    
    canClickBackground = false;

    bgSound.currentTime = 0;
    bgSound.play().catch(err => {
        console.log("استمر في اللعب، تم تجاوز قيود المتصفح للصوت تم التشغيل بنجاح.");
        bgSound.muted = false;
        bgSound.play();
    });

    magicBtn.classList.add('opacity-0', 'pointer-events-none');
    setTimeout(() => magicBtn.classList.add('hidden'), 300);

    let delay = 0;

    for (let row = 0; row < totalRows; row++) {
        setTimeout(() => {
            for (let col = 0; col < totalCols; col++) {
                const index = (row * totalCols) + col;
                if (stickersArray[index]) {
                    stickersArray[index].classList.remove('opacity-0', 'scale-50');
                    stickersArray[index].classList.add(
                        'opacity-100', 
                        'scale-100', 
                        'bg-gradient-to-br', 
                        'from-rose-500/80', 
                        'to-fuchsia-600/80', 
                        'border-white/50', 
                        'shadow-[0_0_20px_rgba(217,70,239,0.6)]'
                    );
                }
            }
        }, delay);
        
        delay += 600;
    }

    setTimeout(() => {
        hideBtn.classList.remove('hidden');
        setTimeout(() => {
            hideBtn.classList.remove('opacity-0', 'pointer-events-none');
        }, 50);
    }, delay);
});

hideBtn.addEventListener('click', (e) => {
    e.stopPropagation();

    bgSound.pause();
    bgSound.currentTime = 0;

    hideBtn.classList.add('opacity-0', 'pointer-events-none');
    setTimeout(() => hideBtn.classList.add('hidden'), 300);

    for (let i = 0; i < stickersArray.length; i++) {
        stickersArray[i].classList.remove(
            'opacity-100', 
            'scale-100', 
            'bg-gradient-to-br', 
            'from-rose-500/80', 
            'to-fuchsia-600/80', 
            'border-white/50', 
            'shadow-[0_0_20px_rgba(217,70,239,0.6)]'
        );
        stickersArray[i].classList.add('opacity-0', 'scale-50');
    }

    setTimeout(() => {
        magicBtn.classList.remove('hidden');
        setTimeout(() => {
            magicBtn.classList.remove('opacity-0', 'pointer-events-none');
            canClickBackground = true;
        }, 50);
    }, 500);
});

document.addEventListener('click', (e) => {
    if (!canClickBackground) return;

    const floater = document.createElement('div');
    floater.classList.add('floating-sticker');
    
    floater.style.left = `${e.clientX}px`;
    floater.style.top = `${e.clientY}px`;
    
    floater.innerText = emojis[Math.floor(Math.random() * emojis.length)];
    
    document.body.appendChild(floater);
    
    setTimeout(() => {
        floater.remove();
    }, 800);
});