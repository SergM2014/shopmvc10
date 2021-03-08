require('./bootstrap');

require('alpinejs');


window.tree = function()
{
    return {

        minimised : true,
//the width of working area
        width : document.getElementById('tree').parentElement.clientWidth,
        childGroups: false,
        directionArr : false,
        directionsColors: ['bg-blue-200','bg-green-200','bg-indigo-200'],

        openChild(level, parentId, currentElemId){

//set minimised tree marker to false
            this.minimised = false;
            let actualEl = this.$refs.tree.querySelector('[data-id = "' + currentElemId + '"]');
//console.log(actualEl)


            let actualOffsetTop = actualEl.offsetTop;

            let actualOffsetHeight = this.$refs.tree.offsetHeight

            this._closeUselessGroups(level,parentId);


            let nextLevel = level+1;

            let myItemsParentIdArr = this.$refs.tree.querySelectorAll('.origin');

            let myItemsParentId = false;
            let insertedItem = false;
             myItemsParentIdArr.forEach( (item) => {
                     if(item.dataset.parentId == parentId) {
                     myItemsParentId = item;} });

             let insertedNodesArr = this.$refs.tree.querySelectorAll('.inserted');
             if(insertedNodesArr) {

                 insertedNodesArr.forEach( (item) => {
                     if(item.dataset.parentId == parentId) {
                         insertedItem = item;} });
                 if (insertedItem) myItemsParentId = insertedItem;
             }

            let childrenGroup = document.querySelector('[data-level = "'+nextLevel+'"]')

            this._paintStuff(actualEl, childrenGroup)
 // if next items level doesnot exsists exit the process
            if(!myItemsParentId) return;

 //if small screen

            if(window.innerWidth < 768) {
//if the item is already inserted
                if(insertedItem){
                    insertedItem.classList.remove('hidden');
                } else {
                    let clonedItemsParentId = myItemsParentId.cloneNode(true);
                    let elem = this.$refs.tree.querySelector('[data-id = "' + parentId + '"]');
                    elem.insertAdjacentElement('afterend', clonedItemsParentId);
                    clonedItemsParentId.classList.add('inserted');
                    clonedItemsParentId.classList.remove('origin');
                    myItemsParentId.innerHTML = '';
                    myItemsParentId.classList.add('empty');
                    myItemsParentId.classList.remove('origin')
                }
            }
          //end of small screen
            else {
                // if screen is beeg
                myItemsParentId.classList.remove('hidden');
            }



            actualOffsetTop = actualOffsetTop-4;

            childrenGroup.classList.remove('hidden');

            childrenGroup.style.paddingTop = actualOffsetTop+"px";

            if(actualOffsetHeight < childrenGroup.offsetHeight){

              let diff = childrenGroup.offsetHeight - actualOffsetHeight;

              actualOffsetTop = actualOffsetTop - diff;

             if(actualOffsetTop < 0) actualOffsetTop = 0;
                childrenGroup.style.paddingTop = actualOffsetTop+"px";
            }


        },

        _closeUselessGroups(level){

                let branches = this.$refs.tree.querySelectorAll('[data-level]');

                branches.forEach((branch) => {
                    if(branch.dataset.level > level) { branch.classList.add('hidden');
                    branch.classList.remove('z-10','m-2', 'shadow-2xl')}
                    if(branch.dataset.level == level ) branch.classList.remove('m-2', 'shadow-2xl')

                })
            },



        closeAll(){
// if minimised tree marker then escape
            if(this.minimised === true) return;

            let tree = this.$refs.tree;
            let branches = tree.querySelectorAll('[data-level]');

            branches.forEach((branch) => {
                if(branch.dataset.level > 0 )
                 branch.classList.add('hidden');
                branch.classList.remove('z-10')
            })
// set marker of minimised tree to true
            this.minimised = true;
        },

        recoverInitialTree(){
            if(window.innerWidth < 768) return;

            let insertedList = this.$refs.tree.querySelectorAll('.inserted')

//exit if nodeList ist empty
            if(insertedList.length == 0) return;

            let emptedList = this.$refs.tree.querySelectorAll('.empty');
//move inserted items to origin nodes
            for (let i = 0 ; i < insertedList.length; i++ )
            {
                let innerHtml = insertedList[i].innerHTML;

                emptedList[i].innerHTML = innerHtml;
                emptedList[i].classList.add('origin');
                emptedList[i].classList.remove('empty');
                insertedList[i].remove();
            }

        },

        estRowsDirection()
        {
            this.childGroups = this.$refs.tree.querySelectorAll('.childrenGroup');
            let actGroupWidth = this.childGroups[0].clientWidth;
            let chunk_size = Math.floor(this.width/actGroupWidth)-1;
//*******************
//tis piece of code is nesasery for apropriate building to left direction rows
            let leftArr =[];
            for(let i=0; i< chunk_size; i++){
                leftArr[i] = actGroupWidth*i;
            }
            let leftArrRev = [...leftArr].reverse()
//*****************

            let arr  = Array.from(this.childGroups);
//for technical needs remove first elem of array
            let firstElem = arr.shift();
            let groups = arr.map( function(e,i){
                return i%chunk_size===0 ? arr.slice(i,i+chunk_size) : null;
            }).filter(function(e){ return e; });


//in [0] tothe right [1] to the left
             this.directionArr = groups.reduce((accumulator, value, index) => (accumulator[index % 2].push(value), accumulator), [[], []]);


            //direction to the left
            for (let i =0; i < this.directionArr[1].length; i++){

                let length = this.directionArr[1][i].length;

                for(let i2 = 0; i2< length; i2++)
                {
                    this.directionArr[1][i][i2].style.left = leftArrRev[i2]+'px';
                }

            }


//to the right
            for (let i =0; i < this.directionArr[0].length; i++){
                //if(i === 0 ) continue;
                    let length = this.directionArr[0][i].length;

                    for (let i2 = 0; i2 < length; i2++) {
                        this.directionArr[0][i][i2].style.left = leftArr[i2]+actGroupWidth+'px';
                    }
            }

            this._showArrows();
            this._directionRowsColor();

        },

        _showArrows()
        {
            //show appropriate arrows
            let arrow = this.childGroups[0].querySelectorAll('.arrow-right');
            arrow.forEach(item => item.classList.remove('hidden'));



            for(let i =0; i< this.directionArr[0].length; i++)
            {
                for(let i2 = 0; i2 < this.directionArr[0][i].length; i2++)
                {
                    if(i2 === this.directionArr[0][i].length-1){
                        let arrow = this.directionArr[0][i][i2].querySelectorAll('.arrow-left');
                        arrow.forEach(item => {
                            item.classList.remove('hidden');
                            item.parentNode.prepend(item)
                        })
                    } else {
                        let arrow = this.directionArr[0][i][i2].querySelectorAll('.arrow-right');
                        arrow.forEach(item => item.classList.remove('hidden'))
                    }

                }

            }


            for(let i =0; i< this.directionArr[1].length; i++)
            {
                for(let i2 = 0; i2 < this.directionArr[1][i].length; i2++)
                {
                    if(i2 === this.directionArr[1][i].length-1){
                        let arrow = this.directionArr[1][i][i2].querySelectorAll('.arrow-right');
                        arrow.forEach(item => item.classList.remove('hidden'))
                    } else {

                        let arrow = this.directionArr[1][i][i2].querySelectorAll('.arrow-left');
                        arrow.forEach(item => {
                            item.classList.remove('hidden');
                            item.parentNode.prepend(item)
                        })
                    }


                }

            }
        },

        _directionRowsColor()
        {
            //set parens column color
            let stuffs = this.childGroups[0].querySelectorAll('.stuff');
            stuffs.forEach(item => item.classList.add(this.directionsColors[0]))

        },



        _paintStuff(actualEl, childrenGroup)
        {
            //painting each next child items
            let classes = actualEl.classList;
            let color;
            for(let i=0; i<classes.length; i++)
            {
                if(classes[i].startsWith('bg')) color = classes[i];
            }

            let stuff = childrenGroup.querySelectorAll('.stuff');

            stuff.forEach(item => item.classList.add(color));

//returning previous color for the last direction stuff in case of turnig direction left
            if(actualEl.classList.contains('last') && !actualEl.querySelector('.arrow-left')
                 && !actualEl.querySelector('.arrow-right')
            ){
                this._returnLastStuffColor(actualEl, this.directionsColors[1])
            }



            let turningLeft =  actualEl.querySelector('.arrow-left:not(.hidden)');
            if(turningLeft) {
                let outgoingParentId = actualEl.closest('.parentIdItems').dataset.parentId;

                let outgoingParentEl = this.$refs.tree.querySelector('[data-id = "' + outgoingParentId + '"]');

                let findPrevieousRight = outgoingParentEl.querySelector('.arrow-right:not(.hidden)');
                if (turningLeft && findPrevieousRight)
                {

                    let children = childrenGroup.querySelectorAll('.stuff');

                    children.forEach(item => {
                        item.classList.add(this.directionsColors[1]);
                        item.classList.remove(this.directionsColors[0])
                    })

                    actualEl.closest('.parentIdItems').querySelectorAll('.stuff').forEach(item =>
                        {
                            item.classList.add(this.directionsColors[1], 'last');
                            item.classList.remove(this.directionsColors[0])
                        }

                    )

                }
            }



            let turningRight =  actualEl.querySelector('.arrow-right:not(.hidden)');
            if(turningRight) {

                let parentDiv = actualEl.closest('.parentIdItems');
                if(!parentDiv) return;

                let outgoingParentId =  parentDiv.dataset.parentId;

                let outgoingParentEl = this.$refs.tree.querySelector('[data-id = "' + outgoingParentId + '"]');

                let findPrevieousLeft = outgoingParentEl.querySelector('.arrow-left:not(.hidden)');
                if (turningRight && findPrevieousLeft)
                {

                    let children = childrenGroup.querySelectorAll('.stuff');

                    children.forEach(item => {
                        item.classList.add(this.directionsColors[2]);
                        item.classList.remove(this.directionsColors[1])
                    })

                    actualEl.closest('.parentIdItems').querySelectorAll('.stuff').forEach(item =>
                        {
                            item.classList.add(this.directionsColors[2], 'last');
                            item.classList.remove(this.directionsColors[1])
                        }

                    )

                }
            }
        },

        _returnLastStuffColor(actualEl, colorToDel)
        {
            let parentEl = actualEl.closest('.childrenGroup');

            let parentElClasses = parentEl.querySelector('.stuff').classList;
            let currentColorToDel;

            for(let i=0; i< parentElClasses.length; i++)
            {
                if(parentElClasses[i].startsWith('bg'))  currentColorToDel = parentElClasses[i];
            }

            let previousSiblingClasses =  parentEl.previousElementSibling.querySelector('.stuff').classList;
    //console.log(previousSiblingClasses)

            let previousColor;
            for(let i=0; i<previousSiblingClasses.length; i++)
            {
                if(previousSiblingClasses[i].startsWith('bg'))  previousColor = previousSiblingClasses[i];
            }

            let stuff = parentEl.querySelectorAll('.stuff');
            stuff.forEach(item => {
                item.classList.remove(currentColorToDel)
                item.classList.add(previousColor);

            })
        }


    }
}
