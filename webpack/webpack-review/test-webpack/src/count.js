// import '@babel/polyfill';
function counter () {
    const arr = [
        new Promise(() => {}),
        new Promise(() => {})
    ];
    arr.map((item) => {
        console.log('item>>>', item);
    });
    console.log('counter....ddd....')
}



export default counter;