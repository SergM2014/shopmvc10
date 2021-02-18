require('./bootstrap');

require('alpinejs');


window.tree = function()
{
    return {

        minimised : true,

        openChild(level, parentId){
//set minimised tree marker to false
            this.minimised = false;

            this._closeUselessGroups(level,parentId);

            let nextLevel = level+1;
           // let myItemParentId = document.querySelector('[data-parent-id = "'+parentId+'"]')
            let myItemParentId = this.$refs.tree.querySelector('[data-parent-id = "'+parentId+'"]')
 // if next items level doesnot exsists exit the process
            if(!myItemParentId) return;

            myItemParentId.classList.remove('hidden');

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
        }

    }
}


let treeWidth = document.getElementById('tree').clientWidth;
console.log(treeWidth)

