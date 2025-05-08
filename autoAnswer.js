const baseClasses = ["_s6zfc1u", "_ssxvf9l", "_4i5p5ae", "_1r8cd7xe", "_1yok8f4"];

(async () => { 
    while (features.autoAnswer && features.questionSpoof) {
        for (const q of baseClasses) {
            findAndClickByClass(q);
        }
        await delay(featureConfigs.autoAnswerDelay * 750);
    }
})();