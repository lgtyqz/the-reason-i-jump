"use strict";
(function(){
    let zoomLevel = 0;
    const MAX_ZOOM = 3;
    let TEXT_SPAWN_INTERVAL;

    const OUTSIDE_THOUGHTS = [
        "Why can't he be normal?",
        "Why doesn't he listen?",
        "Why is he so weird?",
        "He wants to be left alone.",
        "He doesn't want to play with us.",
        "He's like a child.",
        "Why can't he talk right?",
        "Why can't he make eye contact?",
        "He's helpless.",
        "He's hopeless.",
        "He overreacts too much.",
        "He must be suffering from his autism.",
        "He probably doesn't want to learn.",
        "He doesn't want friends.",
        "Why is he so unfriendly?",
        "Why does he watch the same things over and over?",
    ];

    const INNER_THOUGHTS = [
        "I want to learn.",
        "I want to make friends.",
        "Autism is my normal.",
        "I'm frustrated.",
        "I can't control it, but I want to.",
        "Why do people think I want to be lonely?",
        "I don't mean to be rude.",
        "I feel guilt for the pain that I cause.",
        "I'm sorry.",
        "Please understand what I'm going through.",
        "Why can't I have more control?",
        "Please don't give up on me!",
        "I don't want to bring grief to anybody.",
        "Rejection feels miserable.",
        "Why can I never made myself understood??",
        "Familiarity feels nice—don't people understand?"
    ];

    window.addEventListener("load", init);

    function init(){
        console.log("initialized");
        // Add click zooming functionality.
        document.addEventListener("click", zoom);
        TEXT_SPAWN_INTERVAL = setInterval(spawnText, 250);
    }

    function zoom(){
        console.log("beep");
        document.getElementById("content");
        //document.body.style.width = "200%";
        //document.body.style.height = "200%";
        if(zoomLevel == 0){
            document.getElementById("author").classList.add("zoom-1");
            document.getElementById("bystander-1").classList.add("shrunk");
            document.getElementById("bystander-2").classList.add("shrunk");
        }else if(zoomLevel == 1){
            document.getElementById("author").classList.remove("zoom-1");
            document.getElementById("author").classList.add("zoom-2");
            document.getElementById("final-zoom").classList.remove("shrunk");
            document.getElementById("final-zoom").classList.add("unshrunk");
            clearInterval(TEXT_SPAWN_INTERVAL);
        }else if(zoomLevel == 2){
            document.getElementById("author").classList.remove("zoom-2");
            document.getElementById("bystander-1").classList.remove("shrunk");
            document.getElementById("bystander-2").classList.remove("shrunk");
            document.getElementById("final-zoom").classList.remove("unshrunk");
            document.getElementById("final-zoom").classList.add("shrunk");
            TEXT_SPAWN_INTERVAL = setInterval(spawnText, 250);
        }
        zoomLevel = (zoomLevel + 1) % MAX_ZOOM;
    }

    function spawnText(){
        let text = document.createElement("p");
        text.classList.add("spawned");
        if(zoomLevel == 0){
            text.textContent = OUTSIDE_THOUGHTS[Math.floor(Math.random() * OUTSIDE_THOUGHTS.length)];
        }else if(zoomLevel == 1){
            text.textContent = INNER_THOUGHTS[Math.floor(Math.random() * INNER_THOUGHTS.length)];
            text.classList.add("inner");
        }
        text.style.left = (65 + Math.floor(Math.random() * 50)) % 90 + "%";
        text.style.top = 10 + Math.floor(Math.random() * 80) + "%";
        setTimeout(() => shrinkText(text), 1000);
        document.getElementById("content").appendChild(text);
    }

    function shrinkText(text){
        text.classList.add("shrunk");
        setTimeout(() => destroyText(text), 1000);
    }

    function destroyText(text){
        text.remove();
    }
})();