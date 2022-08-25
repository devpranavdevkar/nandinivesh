// const app = document.getElementById('root');

// const logo = document.createElement('img');
// logo.src = 'logo.png';

// const container = document.createElement('div');
// container.setAttribute('class', 'container');

// app.appendChild(logo);
// app.appendChild(container);

// var request = new XMLHttpRequest();
// request.open('GET', 'https://4163-45-250-226-119.in.ngrok.io/api/v1/admin/getAllBlog?limit=10&pageNo=0', true);
// request.onload = function () {
//     console.log(JSON.parse(this.response))
//     // Begin accessing JSON data here
//     var data = JSON.parse(this.response);
//     console.log(data?.data?.Blog)
//     data = data?.data?.Blog;
//     if (request.status >= 200 && request.status < 400) {
//         data.forEach(blog => {
//             const card = document.createElement('div');
//             const src = document.createElement('src');
//             card.setAttribute('class', 'card', 'img');

//             const h1 = document.createElement('h1');
//             h1.textContent = blog.peragraph1;


//             const p1 = document.createElement('p1');
//             blog.peragraph1 = blog.peragraph1.substring(0, 300);
//             p1.textContent = `${blog.peragraph1}...`;


//             const p2 = document.createElement('p2');
//             blog.peragraph2 = blog.peragraph2.substring(0, 300);
//             p2.textContent = `${blog.peragraph2}...`;


//             // const p3 = document.createElement('p3');
//             // blog.photo = blog.photo.src = data.src[0].photo.large;
//             // blog.img = blog.photo

//             // const photo = blog.photo;
//             // blog.photo = blog.photo;
//             // photo.img = blog.photo;

//             const img = new Image();   // Create new img element
//             img.addEventListener('load', function () {
//                 // execute drawImage statements here
//             }, false);
//             img.src = 'logo.png'; // Set source path


//             container.appendChild(card);
//             // card.appendChild(h1);
//             card.appendChild(p1);
//             card.appendChild(p2);
//             src.appendChild(p3);


//             // const imageUrl = "https://i.picsum.photos/id/566/200/300.jpg?hmac=gDpaVMLNupk7AufUDLFHttohsJ9-C17P7L-QKsVgUQU";

//             // (async () => {
//             //     const response = await fetch(imageUrl)
//             //     const imageBlob = await response.blob()
//             //     const reader = new FileReader();
//             //     reader.readAsDataURL(imageBlob);
//             //     reader.onloadend = () => {
//             //         const base64data = reader.result;
//             //         console.log(base64data);
//             //     }
//             // })()

//         });
//     } else {
//         const errorMessage = document.createElement('marquee');
//         errorMessage.textContent = `Gah, it's not working!`;
//         app.appendChild(errorMessage);
//     }
// }

// request.send();



fetch('https://4c88-45-250-226-117.in.ngrok.io/api/v1/admin/getAllBlog?limit=10&pageNo=0').then((data) => {
    // console.log(data);
    return data.json();


}).then((completedata) => {
    // console.log(completedata);
    // document.getElementById('root').
    //     innerHTML = completedata[2].title;
    let data1 = "";
    completedata.data.Blog.map((values) => {
        data1 += `<div class="card">
            <h1 class="title">${values.title}</h1>
            <img class="images"
                src=${values.photo}
                alt="img1">
            <p>${values.updated_at}</p>
            <p class="category">${values.peragraph1}</p>
            <p class="price">${values.peragraph2}</p>
        </div>`
    });
    document.getElementById("cards").innerHTML = data1;
}).catch((err) => {
    console.log(err);
})