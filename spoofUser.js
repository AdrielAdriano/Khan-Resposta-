plppdo.on('domChanged', () => {
    if(!device.apple){
        const pfpElement = document.querySelector('.avatar-pic');
        const nicknameElement = document.querySelector('.user-deets.editable h2');
        if (nicknameElement) nicknameElement.textContent = featureConfigs.customUsername || user.nickname; 
        if (featureConfigs.customPfp && pfpElement) { Object.assign(pfpElement, { src: featureConfigs.customPfp, alt: "Not an image URL"} );pfpElement.style.borderRadius="50%"}
    }
});