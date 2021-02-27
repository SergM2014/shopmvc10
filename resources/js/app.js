require('./bootstrap');

require('alpinejs');


window.tree = function()
{
    return {

        minimised : true,
        flowDirection : 'right',
//the width of working area
        width : document.getElementById('tree').clientWidth,

        openChild(level, parentId, currentElemId){

//set minimised tree marker to false
            this.minimised = false;
            let actualEl = this.$refs.tree.querySelector('[data-id = "' + currentElemId + '"]');
            let actualOffsetTop = actualEl.offsetTop;

            let actualOffsetHeight = this.$refs.tree.offsetHeight

            this._closeUselessGroups(nextLevel,parentId);




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

            let changedFlowMargin = this._changeWorkFlowToLeft(level,nextLevel);

            childrenGroup.style.paddingTop = actualOffsetTop+"px";

            if(actualOffsetHeight < childrenGroup.offsetHeight){

              let diff = childrenGroup.offsetHeight - actualOffsetHeight;

              actualOffsetTop = actualOffsetTop - diff;

             if(actualOffsetTop < 0) actualOffsetTop = 0;
                childrenGroup.style.paddingTop = actualOffsetTop+"px";
            }




//console.log(changedFlowMargin)

            if(typeof changedFlowMargin == 'number'){
                childrenGroup.classList.add('absolute', `ml-${changedFlowMargin}`, 'h-full', 'z-10', 'bg-gray-100' );
//console.log(childrenGroup)
            }
        },

        _closeUselessGroups(level){

                let branches = this.$refs.tree.querySelectorAll('[data-level]');

                branches.forEach((branch) => {
                    if(branch.dataset.level > level) { branch.classList.add('hidden')}
                })
            },

        closeAll(){
// if minimised tree marker then escape
            if(this.minimised === true) return;

            let tree = this.$refs.tree;
            let branches = tree.querySelectorAll('[data-level]');

            branches.forEach((branch) => {
                if(branch.dataset.level > 0 )
                 branch.classList.add('hidden')
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
        _changeWorkFlowToLeft(level,nextLevel)
        {

            let parentBlock = this.$refs.tree.querySelector('[data-level = "' +level+ '"]');
            let nexChildGroup = this.$refs.tree.querySelector('[data-level = "' +nextLevel+ '"]');
//console.log(nexChildGroup);
            let curWidth = nexChildGroup.offsetLeft + nexChildGroup.clientWidth;
// console.log('left=>'+nexChildGroup.offsetLeft)
// console.log('childWidth=>'+nexChildGroup.clientWidth)
console.log('currentWidth=>'+curWidth)
console.log('this.width=>'+this.width)
            if(this.flowDirection == 'right') {

                if (curWidth <= this.width) return false;

                this.flowDirection = 'left';


            }

            if(this.flowDirection == 'left'){
                if(curWidth < 0 ){
                    this.flowDirection = 'right';
                    margin = false;
                    return margin;
                }
            }


            let margin = parentBlock.offsetLeft - nexChildGroup.clientWidth;
            //tailwind caused counting of rem relative margin, get taiwind measure
            margin = margin/(this._convertRemToPixels()/4)
//console.log('margin=>'+margin)

//should be returned false oder number
            return margin;

        },

        _convertRemToPixels() {
            return  parseFloat(getComputedStyle(document.documentElement).fontSize);
        }

    }
}
