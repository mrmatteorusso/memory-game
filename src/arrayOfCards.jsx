
import { nanoid } from 'nanoid'


// export default function fetchCats(totCards = 4) {
//     try {
//         const cardDataTest = [];
//         return fetchCatApi(totCards).then((data) => {
//promise 
//             console.log("before", cardDataTest);
//             for (let i = 0; i < totCards; i++) {
//                 cardDataTest.push({
//                     id: nanoid(),
//                     isShown: false,
//                     imgUrl: data[i].url,
//                     isPaired: false
//                 },
//                     {
//                         id: nanoid(),
//                         isShown: false,
//                         imgUrl: data[i].url,
//                         isPaired: false
//                     });
//             }

//             console.log("after", cardDataTest);
//             console.log("data", data);

//             shuffle(cardDataTest);
//             return cardDataTest
//         });
//     } catch (error) {
//         console.error("this is my error:", error);
//     }
// }

// function shuffle(array) {
//     return array.sort(() => Math.random() - 0.5);

// }

// async function fetchCatApi(totCards) {

//     const response = await fetch(`https://api.thecatapi.com/v1/images/search?limit=${totCards}`, {
//         headers: {
//             'x-api-key': 'live_laMC2CPO1g8xHT3rpQ3NADucDR4HZfbrWYkClrq3u380ShVrmyXs8s6Za3bUd0pH'
//         }
//     });

//     if (!response.ok) {
//         throw new Error('Failed to fetch cat images');
//     }

//     const data = await response.json();
//     return data
// }


// function shuffle(array) {
//     cardDataTest = array.sort(() => Math.random() - 0.5);
//     return cardDataTest
// }

// Call the fetchCats function

//fetch returns a promise <response>
//general function  returns a promise <depends> => result methods


export default async function fetchCats(totCards, type) {
    try {
        const cardDataTest = [];
        const data = await fetchCatApi(totCards, type)
        for (let i = 0; i < totCards; i++) {
            cardDataTest.push({
                id: nanoid(),
                isShown: false,
                imgUrl: data[i].url,
                isPaired: false
            },
                {
                    id: nanoid(),
                    isShown: false,
                    imgUrl: data[i].url,
                    isPaired: false
                });
        }
        shuffle(cardDataTest);
        return cardDataTest

    } catch (error) {
        console.error("this is my error:", error);
    }
}

function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);

}

async function fetchCatApi(totCards, type) {
    const response = await fetch(`https://api.the${type}api.com/v1/images/search?limit=${totCards}`, {
        headers: {
            'x-api-key': 'live_laMC2CPO1g8xHT3rpQ3NADucDR4HZfbrWYkClrq3u380ShVrmyXs8s6Za3bUd0pH'
        }
    });

    if (!response.ok) {
        throw new Error('Failed to fetch cat images');
    }

    const data = await response.json();
    return data
}




// function helloWorld1(){return "Hello"}
// async function helloWorld2(){return "Hello"}


// const one = helloWorld1();
// const two = helloWorld2();

//while loop



// async function somemethod() { }


// async function callIt() {
//     const result = await somemethod();
// }


// function callIt() {
//   return  somemethod().then((response) => response.json().then(data)=> data);
// }