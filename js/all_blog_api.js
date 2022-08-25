fetch('https://4c88-45-250-226-117.in.ngrok.io/api/v1/admin/getAllBlog?limit=10&pageNo=0').then(
    (data) => {
        return data.json();


    }).then((completedata) => {
        console.log(completedata);

        // console.log(completedata);
        // document.getElementById('root').
        //     innerHTML = completedata[2].title;
        let data1 = "";
        completedata.data.Blog.map((values) => {
            data1 += ` <div
            class="w-full mx-3 mb-16  transition-all duration-200 ease-in cursor-pointer xl:max-w-xsm4 lg:mb-10 max-w-mdd hover:shadow-lg blog-post sm:max-w-full sm:mx-0 lg:max-w-xs2 md:max-w-xsm3 sm:hover:shadow-none">
            <figure
                class="overflow-hidden transition-all duration-200 ease-in rounded-md md:min-h-sm min-h-lg xl:min-h-md sm:min-h-auto max-h-lg sm:max-h-xl">
                <a href="single_blog.html" class="img-wrapper">
                    <img width="1200" height="675"
                        src=${values.photo}
                        onclick="myFunction(${values.id})"
                        class="w-full wp-post-image" alt="health cover for parents" loading="lazy"
                        </a>
            </figure>
            <div class="p-4 archive-info">
                <a href="#">
                    <h4>
                       ${values.peragraph1}
                        </h4>
                      
                </a>
                <p class="pt-2 text-sm font-normal leading-relaxed text-gray-600"></p>
                <p>
                ${values.peragraph2}
                </p>
                
                <p></p>
            </div>
            <a href="#"
                class="hidden w-full p-3 mt-2 text-sm font-medium leading-none text-center text-gray-700 transition-all duration-200 ease-in bg-gray-100 rounded-md read-more sm:block hover:bg-black hover:text-white">Read
                more</a>
        </div>`
        });
        document.getElementById("allblogs").innerHTML = data1;
    }).catch((err) => {
        console.log(err);
    })


function testJS() {
    var b = document.getElementById('name').value,
        url = 'http://single_blog.html?name=' + encodeURIComponent(b);

    document.location.href = url;
}

function myFunction(id) {
    console.log(id)
    localStorage.setItem('id', id)
    link.href = '/single_blog.html'
}