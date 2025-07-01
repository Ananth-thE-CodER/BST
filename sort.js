export class MergeSort {

    sort(arr) {
        if (arr.length > 1) {
            var mid = Math.floor(arr.length / 2);
            var left = arr.slice(0, mid);
            var right = arr.slice(mid, arr.length);
            this.sort(left);
            this.sort(right);
            var i = 0, j = 0, k = 0;
            while (i < left.length && j < right.length) {
                if (left[i] < right[j]) {
                    arr[k] = left[i];
                    i++;
                }
                else {
                    arr[k] = right[j];
                    j++;
                }
                k++;
            }
            while (i < left.length) {
                arr[k] = left[i];
                i++;
                k++;
            }
            while (j < right.length) {
                arr[k] = right[j];
                j++;
                k++;
            }
        }
        return arr;
    }
}