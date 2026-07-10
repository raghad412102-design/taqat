const toggleBtn = document.getElementById('toggleBtn');

toggleBtn.addEventListener('click', () => {
    document.documentElement.classList.toggle('dark');
    
    if (document.documentElement.classList.contains('dark')) {
        toggleBtn.textContent = 'Disable';
        toggleBtn.classList.remove('bg-gray-100', 'text-gray-700', 'hover:bg-gray-200');
        toggleBtn.classList.add('bg-red-50', 'text-red-600', 'hover:bg-red-100');
    } else {
        toggleBtn.textContent = 'Toggle';
        toggleBtn.classList.remove('bg-red-50', 'text-red-600', 'hover:bg-red-100');
        toggleBtn.classList.add('bg-gray-100', 'text-gray-700', 'hover:bg-gray-200');
    }
});