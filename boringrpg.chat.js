// ==UserScript==
// @description     script to auto-submit the form on time, every time.
// @include	        http://boringrpg.com/*
// @include         http://www.boringrpg.com/*

script = document.createElement('script');
script.src = chrome.extension.getURL('boringrpg.chat.override.js');
scripts = document.head.appendChild(script);
