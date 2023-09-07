var arr = []
const container = document.querySelector(".bars-container");
/**
 * Initializes arrays default values
 */
async function initialize() {
	for (let i = 0; i < 200; i++) {
		const val = randomNumber(5, 400);
		const bar = document.createElement("div");
		bar.classList.add("bar");
		bar.style.height = `${val}px`;
		bar.style.transform = `translateX(${i * 6}px)`;
		const barLabel = document.createElement("label");
		barLabel.classList.add("bar-id");
		barLabel.innerHTML = val;
		bar.appendChild(barLabel);
		container.appendChild(bar);
		arr.push(val);
	}
}
/**
 * Returns a random number between the range of i and j
 */
function randomNumber(i, j) {
	return Math.floor(Math.random() * (j - i + 1) + i);
}
/**
 * Performs merge sort algorithm, then displays animations of what algorithm did
 */
async function mergeSort() {
	var bars = document.querySelectorAll(".bar");
	var auxArray = arr.slice();
	var animations = [];
	mergeSortAuxiliary(arr, 0, arr.length - 1, auxArray, animations);
	animate(animations, bars);
}
/**
 * Merge sort auxiliary function for recursive calls on both sides
 */
function mergeSortAuxiliary(array, left, right, auxArray, animations) {
	if (left >= right) {
		return;
	}
	var m = Math.floor((left + right) / 2);
	mergeSortAuxiliary(auxArray, left, m, array, animations);
	mergeSortAuxiliary(auxArray, m + 1, right, array, animations);
	merge(array, left, m, right, auxArray, animations);
}
/**
 * Merges two subarrays together, adds what needs to be animated to animations array
 */
function merge(array, left, mid, right, auxArray, animations) {
	let k = left;
	let i = left;
	let j = mid + 1;
	while (i <= mid && j <= right) {
		animations.push([i, j, false, true]);
		animations.push([i, j, false, false]);
		if (auxArray[i] <= auxArray[j]) {
			animations.push([k, auxArray[i], true]);
			array[k++] = auxArray[i++];
		}
		else {
			animations.push([k, auxArray[j], true]);
			array[k++] = auxArray[j++];
		}
	}
	while (i <= mid) {
		animations.push([i, i, false, true]);
		animations.push([i, i, false, false]);
		animations.push([k, auxArray[i], true]);
		array[k++] = auxArray[i++];
	}
	while (j <= right) {
		animations.push([j, j, false, true]);
		animations.push([j, j, false, false]);
		animations.push([k, auxArray[j], true]);
		array[k++] = auxArray[j++];
	}
}
/**
 * Performs three way quicksort algorithm, then displays animations of what algorithm did
 */
async function threeWayQuick() {
	var bars = document.querySelectorAll(".bar");
	var animations = [];
	if (arr.length <= 1) {
		return;
	}
	pivot(arr, 0, arr.length - 1, animations);
	animate(animations, bars);
}
/**
 * Pivots array around a random number, adds what needs to be animated to animations array
 */
function pivot(arr, i, j, animations) {
	if (i >= j || i < 0 || i >= arr.length || j >= arr.length) {
		return;
	}
	let x = arr[i];
	let p = i;
	let f = i + 1;
	for (let k = f; k <= j; k++) {
		animations.push([p, k, false, true]);
		animations.push([p, k, false, false]);
		if (arr[k] < x) {
			animations.push([f, arr[k], true]);
			animations.push([k, arr[f], true]);
			swap(arr, f, k);
			animations.push([p, arr[f], true]);
			animations.push([f, arr[p], true]);
			swap(arr, p, f);
			p++;
			f++;
		}
		else if (arr[k] == x) {
			animations.push([f, arr[k], true]);
			animations.push([k, arr[f], true]);
			swap(arr, f, k);
			f++;
		}
	}
	pivot(arr, i, p - 1, animations);
	pivot(arr, f, j, animations);
}
/**
 * Performs heap sort algorithm, then displays animations of what algorithm did
 */
async function heapSort() {
	var bars = document.querySelectorAll(".bar");
	var animations = [];
	if (arr.length <= 1) {
		return;
    }
	for (let i = Math.floor(arr.length / 2); i >= 0; i--) {
		sink(arr, arr.length, i, animations);
	}
	for (let i = arr.length - 1; i >= 0; i--) {
		animations.push([i, arr[0], true]);
		animations.push([0, arr[i], true]);
		swap(arr, i, 0);
		sink(arr, i, 0, animations);
	}
	animate(animations, bars);
}
/**
 * Sinks element to position in heap, adds what needs to be animated to animations array
 */
function sink(arr, last, i, animations) {
	let max = i;
	let l = 2 * i + 1;
	let r = 2 * i + 2;

	if (l < last) {
		animations.push([max, l, false, true]);
		animations.push([max, l, false, false]);
		if (arr[l] > arr[max]) {
			max = l;
		}
	}
	if (r < last) {
		animations.push([max, r, false, true]);
		animations.push([max, r, false, false]);
		if (arr[r] > arr[max]) {
			max = r;
		}
	}
	if (max != i) {
		animations.push([i, arr[max], true]);
		animations.push([max, arr[i], true]);
		swap(arr, i, max);
		sink(arr, last, max, animations);
	}
}
/**
 * Swaps elements in array at positions i and j
 */
function swap(arr, i, j) {
	let temp = arr[i];
	arr[i] = arr[j];
	arr[j] = temp;
}
/**
 * Test function, returns true if array is sorted and false otherwise
 */
function isSorted(arr) {
	for (let i = 0; i < arr.length - 1; i++) {
		if (arr[i + 1] < arr[i]) {
			return false;
		}
	}
	return true;
}
/**
 * Animates bars to demonstrate sorting process of whatever algorithm was chosen
 */
async function animate(animations, bars) {
	for (let i = 0; i < animations.length; i++) {
		let cur = animations[i];
		if (cur[2]) {
			setTimeout(() => {
				const [indexOne, newHeight] = [cur[0], cur[1]];
				const bar = bars[indexOne].style;
				bar.height = `${newHeight}px`;
			}, i * 3);
		}
		else {
			const [indexOne, indexTwo] = [cur[0], cur[1]];
			const barOne = bars[indexOne].style;
			const barTwo = bars[indexTwo].style;
			const comparing = cur[3];
			setTimeout(() => {
				barOne.background = comparing ? "red" : "#02ced1";
				barTwo.background = comparing ? "red" : "#02ced1";
			}, i * 3);
		}
	}
}
/**
 * Generates a new array (refreshes window)
 */
function generate() {
	window.location.reload();
}

initialize();
