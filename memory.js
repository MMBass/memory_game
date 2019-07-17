    var main_div1 = document.querySelector('#main_div1');
    var main_div2 = document.querySelector('#main_div2');
    var table = document.querySelector('#table');
    var startBtn =  document.querySelector('#id_btn');
    var selectSize = document.querySelector('#choiseSize_id');

    function newSize(){
        var col = selectSize.options[selectSize.selectedIndex].value;
        return col;
    }
    
    function newGame(col=newSize()){
        main_div1.classList.add('invisible');
        main_div2.className = 'visible';
        for(i = 1; i <= (col*col); i++){
           var randNumArr = [0];
           var tempArr = [0];
          for(a = 0; randNumArr.length <= (col*col); a++){
               var checkExist = 0;
               var randomTemp=Math.ceil(Math.random()*
               (col*col/2));
               tempArr.push(randomTemp);
               for(b=1; b<=tempArr.length; b++){
                 if(randomTemp == randNumArr[b]){
                    checkExist += 1;
                 }
                }
               if(checkExist < 2){
                randNumArr.push(randomTemp);
               }
           }
        }
        for(j = 1; j < randNumArr.length; j++){
            var squer = document.createElement('div');
            squer.className += 'squer squer'+col+'by'+col+'';
            table.appendChild(squer);
            squer.setAttribute('id','squer'+j+'');

            var img = document.createElement('img');
            img.setAttribute('src','images/pic'+randNumArr[j]+'.png');
            img.setAttribute('style','opacity:0')
            img.setAttribute('id','id_img'+j+'');
            img.setAttribute('class','class_img');
            
            var matchArr = [];
            counter = 0;
            var this1 = '';
            img.addEventListener('click',function discoverImg(){
               
                this.setAttribute('style','opacity:0.9');
                var this2 = this;
                counter++;
                if(counter == 1){
                   this1 = this;
                }
            
                if(counter >= 2){
                    var timeToHide1 = setTimeout( function(){this1.setAttribute('style','opacity:0');
                    this2.setAttribute('style','opacity:0');},1000);
                    
                    counter = 0;
                    var antiEvents = document.createElement('div');
                    antiEvents.setAttribute('class',"antiEvents");
                    table.appendChild(antiEvents);
                    setTimeout(() => antiEvents.setAttribute('class',"invisible"), 1000);
                }
                
                if(this1.src == this.src){
                    clearTimeout(timeToHide1);
        
                }
                matchArr.push(this.src);
                console.log(matchArr);
                console.log(counter);
            })
            squer.appendChild(img);
           
           }
          
           var startAgain = document.createElement('button');startAgain.innerHTML = "start Again";
           main_div2.appendChild(startAgain);
           startAgain.addEventListener('click',reloadPage);
           time();
          
    }
    function time(){
       var timeDiv = document.createElement('div');
       timeDiv.innerHTML = "0:00"
       main_div2.appendChild(timeDiv);
       let seconds = 0;
       let minutes = 0;

       setInterval(function(){
           seconds++;
        
        if(seconds >= 60){
            minutes +=1
            seconds = 0;
        }
        if(seconds < 10){
          timeDiv.innerHTML = ''+minutes+':0'+seconds;
        }else{
        timeDiv.innerHTML = ''+minutes+':'+seconds;
        }
       },1000);
    };

    function reloadPage(){
        document.location.reload(false);
    };
    
    startBtn.addEventListener('click', function(){
        newGame();
    });
    selectSize.addEventListener('change',  newSize);
    
