// ========================================
// INSERTION SORT ALGORITHM
// ========================================

function insertionSort(arr) {

    // Start from the second element
    for (let i = 1; i < arr.length; i++) {

        // Current element to insert
        let current = arr[i];

        // Compare with elements in the sorted portion
        let j = i - 1;

        // Move elements greater than current to one position ahead
        while (j >= 0 && arr[j] > current) {
            arr[j + 1] = arr[j];
            j--;
        }

        // Insert the current element
        arr[j + 1] = current;
    }

    return arr;
}

// ============================
// TEST THE ALGORITHM
// ============================

const numbers = [8, 3, 1, 7, 2, 9, 4];
console.log("Original array:", numbers);
console.log("Sorted array:", insertionSort(numbers));
