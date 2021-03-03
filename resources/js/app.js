require('./bootstrap');

require('alpinejs');


window.tree = function()
{
    return {

        minimised : true,
        flowDirection : 'right',
        flowRight : [],
        flowLeft :[],
//the width of working area
        width : document.getElementById('tree').clientWidth,

        openChild(level, parentId, currentElemId){

//set minimised tree marker to false
            this.minimised = false;
            let actualEl = this.$refs.tree.querySelector('[data-id = "' + currentElemId + '"]');
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

            let childrenGroup = document.querySelector('[data-level = "'+nextLevel+'"]')


            actualOffsetTop = actualOffsetTop-4;


            childrenGroup.classList.remove('hidden');
            let parentContainer = childrenGroup.closest('.childGroupsContainer');
            if(parentContainer)parentContainer.classList.remove('hidden')


            childrenGroup.style.paddingTop = actualOffsetTop+"px";

            if(actualOffsetHeight < childrenGroup.offsetHeight){

              let diff = childrenGroup.offsetHeight - actualOffsetHeight;

              actualOffsetTop = actualOffsetTop - diff;

             if(actualOffsetTop < 0) actualOffsetTop = 0;
                childrenGroup.style.paddingTop = actualOffsetTop+"px";
            }

            // if(typeof changedFlowMargin == 'number'){
            //     childrenGroup.classList.add('absolute', `ml-${changedFlowMargin}`, 'h-full', 'z-10', 'bg-gray-100' );
            // }
        },

        _closeUselessGroups(level){

                let branches = this.$refs.tree.querySelectorAll('[data-level]');

                branches.forEach((branch) => {
                    if(branch.dataset.level > level) { branch.classList.add('hidden'); branch.classList.remove('z-10')}
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


// when the next children Groups items leeave parent with area change deirection to reverse


        _convertRemToPixels() {
            return  parseFloat(getComputedStyle(document.documentElement).fontSize);
        },

        estRowsDirection()
        {
            let childGroups = this.$refs.tree.querySelectorAll('.childrenGroup');
            let actGroupWidth = childGroups[0].clientWidth;
            let parentWidth = this.$refs.tree.clientWidth;
            let numberInRow = Math.floor(parentWidth/actGroupWidth)-1;

            let child = this.$refs.tree.querySelector('.childrenGroup');
            let right = parentWidth -(child.clientWidth * numberInRow)
            let serviceTreeWidth = parentWidth - right;

            let leftArr =[];
            for(let i=0; i< numberInRow; i++){
                leftArr[i] = actGroupWidth*i;
            }

            let leftArrRev = [...leftArr].reverse()






            let chunk_size = numberInRow;
            let arr  = Array.from(childGroups);
            let firstElem = arr.shift();
            let groups = arr.map( function(e,i){
                return i%chunk_size===0 ? arr.slice(i,i+chunk_size) : null;
            }).filter(function(e){ return e; });

//console.log(groups.length)


//in [0] tothe right [1] to the left
            let directionArr = groups.reduce((accumulator, value, index) => (accumulator[index % 2].push(value), accumulator), [[], []]);
//console.log(directionArr[1][0])

            //direction to the left
            for (let i =0; i < directionArr[1].length; i++){

                let length = directionArr[1][i].length;

                for(let i2 = 0; i2< length; i2++)
                {
                    directionArr[1][i][i2].classList.add('absolute');
                    directionArr[1][i][i2].style.left = leftArrRev[i2]+'px';

                }

            }


//to the right
            for (let i =0; i < directionArr[0].length; i++){
                if(i === 0 ) continue;
//console.log('action inright direction')


                    let length = directionArr[0][i].length;

                    for (let i2 = 0; i2 < length; i2++) {
                        directionArr[0][i][i2].classList.add('absolute');
                        directionArr[0][i][i2].style.left = leftArr[i2]+actGroupWidth+'px';
                    }

            }


        }

    }
}
