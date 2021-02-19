require('./bootstrap');

require('alpinejs');


window.tree = function()
{
    return {

        minimised : true,
//the width of working area
        width : document.getElementById('tree').clientWidth,

        openChild(level, parentId){
//set minimised tree marker to false
            this.minimised = false;

            this._closeUselessGroups(level,parentId);

            let nextLevel = level+1;

            let myItemsParentIdArr = this.$refs.tree.querySelectorAll('.origin');
            //let myItemsParentId = myItemsParentIdArr.querySelector('[data-parent-id = "'+parentId+'"]');
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
 // if screen is beeg
           // myItemsParentId.classList.remove('hidden');
 //if small screen
            if(this.$refs.tree.clientWidth < 768) {
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
            childrenGroup.classList.remove('hidden');
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

         getElementBottom(elem) {
             let item = elem.getBoundingClientRect();

             let bottom = item.bottom + pageYOffset;

             return bottom;

        }

    }
}




