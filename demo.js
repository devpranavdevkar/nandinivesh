fetch('http://nandinivesh-api.shreekakajimasale.com/api/v1/user/getGallery?limit=10&pageNo=0').then(
    (data) => {
        return data.json();


    }).then((completedata) => {
        console.log(completedata);

        // console.log(completedata);
        // document.getElementById('root').
        //     innerHTML = completedata[2].title;
        let data1 = "";
        completedata.data.Gallery.map((values) => {
            data1 += ` <section id="gallery" style="margin-top: 5%; margin-bottom: 5%; margin-left: 5%;margin-right: 5%;">
        <div class="row ">
            <div class=" col-lg-4 col-md-12 mb-4 mb-lg-0 ">
                <div class="hovereffect img-responsive">
                    <img src=${values.photo1} class="w-100 shadow-1-strong rounded mb-4 " alt="Boat on Calm Water" />
                </div>
               
            </div>

            

          
        </div>
    </section>`
        });
        document.getElementById("gallery").innerHTML = data1;
    }).catch((err) => {
        console.log(err);
    })