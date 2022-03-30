import { writable } from 'svelte/store';

const writableArray = writable(new Map());

export { writableArray as default };