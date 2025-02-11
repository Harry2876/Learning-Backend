//mapping Arrays
const input = [1,2,3,4,5];

const ans = input.map((i) => {
    return i *2;
});

console.log(ans);

//filtering Arrays

const arr = [1,2,3,4,5];
const filter = arr.filter( (n) => {
    if(n % 2 == 0) {
        return true;
    } else return false;
})

console.log(filter);