
window.tree = function()
{
    return {

        minimised : true,
//the width of working area
        width : document.getElementById('tree').parentElement.clientWidth,
        childGroups: false,
        directionArr : false,
        directionsColors: ['bg-blue-200','bg-green-200','bg-yellow-200'],

        openChild(level, parentId, currentElemId){

//set minimised tree marker to false
            this.minimised = false;
            let actualEl = this.$refs.tree.querySelector('[data-id = "' + currentElemId + '"]');

            this._closeUselessGroups(level,parentId);

            let nextLevel = level+1;
            let childrenGroup = document.querySelector('[data-level = "'+nextLevel+'"]')
            if(!childrenGroup) return;
//console.log(childrenGroup);
            if(window.innerWidth <= 768)
            {
                this._openSmScreenChildren(actualEl, childrenGroup, parentId)
                return;
            }


            this._paintStuff(actualEl, childrenGroup)

            let myItemsParentIdArr = this.$refs.tree.querySelectorAll('.origin');

            let myItemsParentId = false;

            myItemsParentIdArr.forEach( (item) => {
                if(item.dataset.parentId == parentId) {
                    myItemsParentId = item;} });

            if(!myItemsParentId) return;

            myItemsParentId.classList.remove('hidden');
            childrenGroup.classList.remove('hidden');


            let actualOffsetTop = actualEl.offsetTop;
            let actualOffsetHeight = this.$refs.tree.offsetHeight

            actualOffsetTop = actualOffsetTop-4;

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

        restoreAppropriateTree()
        {
            this._buildSmallScreenTree();
            this._recoverInitialBigTree();
        },

        _recoverInitialBigTree()
        {

            if(window.innerWidth < 768) return;
            this._hideDownArrows();

            let childrenGroups = this.$refs.tree.querySelectorAll('.childrenGroup');

//b esides the first child group

            for(let i = 1; i< childrenGroups.length; i++)
            {
                childrenGroups[i].classList.add('hidden','top-0');
                childrenGroups[i].classList.remove('left-0','right-0');
                childrenGroups[i].style.removeProperty('top');

                let classes = childrenGroups[i].classList;
                for(let i2=0; i2 < classes.length; i2++)
                {
                    if(classes[i2].startsWith('bg')) childrenGroups[i].classList.remove(classes[i])
                }
            }

            let stuffes = this.$refs.tree.querySelectorAll('.stuff');
            for(let i = 1; i < stuffes.length; i++ )
            {
                let classes = stuffes[i].classList;
                for(let i2 =0; i2 < classes.length; i2++)
                {
                    if(classes[i2].startsWith('bg')) stuffes[i].classList.remove(classes[i2])

                }

            }

           this._estRowsDirection()

        },


        initTree()
        {
            this.childGroups = this.$refs.tree.querySelectorAll('.childrenGroup');
            this._estRowsDirection();
            this._buildSmallScreenTree();
        },
        _estRowsDirection()
        {
            if(window.innerWidth <= 768) return;

            let actGroupWidth = this.childGroups[0].clientWidth;
            let width = document.getElementById('tree').parentElement.clientWidth

            let chunk_size = Math.floor(width/actGroupWidth)-1;

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
//console.table(arr)
            let groups = arr.map( function(e,i){
                return i % chunk_size === 0 ? arr.slice(i,i+chunk_size) : null;
            }).filter(function(e){ return e; });


//in [0] tothe right [1] to the left
            this.directionArr = groups.reduce((accumulator, value, index) =>
                (accumulator[index % 2].push(value), accumulator), [[], []]
            );
//console.log(this.directionArr)
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
                let length = this.directionArr[0][i].length;
                for (let i2 = 0; i2 < length; i2++) {
                    this.directionArr[0][i][i2].style.left = leftArr[i2]+actGroupWidth+'px';
                }
            }

            this._showSideArrows();
            this._setFirstColumnColor();

        },

        _showSideArrows()
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

        _hideSideArrows()
        {
            let arrows = this.$refs.tree.querySelectorAll('.arrow-right, .arrow-left');
            arrows.forEach(item => item.classList.add('hidden'));
        },

        _showDownArrows()
        {
            for(let i = 0; i< this.childGroups.length; i++) {
                let arrows = this.childGroups[i].querySelectorAll('.arrow-down');
                arrows.forEach(item => item.classList.remove('hidden'));
            }
        },

        _hideDownArrows()
        {
            for(let i = 0; i< this.childGroups.length; i++) {
                let arrows = this.childGroups[i].querySelectorAll('.arrow-down');
                arrows.forEach(item => item.classList.add('hidden'));
            }
        },

        _setFirstColumnColor()
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

//returning previous color for the last direction stuff in case of turnig direction reverse
            if(actualEl.classList.contains('last') && !actualEl.querySelector('.arrow-left')
                && !actualEl.querySelector('.arrow-right')
            ){
                this._getLastStuffColor(actualEl)
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
                        item.classList.remove(this.directionsColors[0]);
                    })

                    actualEl.closest('.parentIdItems').querySelectorAll('.stuff').forEach(item =>
                        {
                            item.classList.add(this.directionsColors[1], 'last');
                            item.classList.remove(this.directionsColors[0]);
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
                if(!outgoingParentEl){ return }
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

        _getLastStuffColor(actualEl)
        {
            let parentEl = actualEl.closest('.childrenGroup');

            let parentElClasses = parentEl.querySelector('.stuff').classList;
            let currentColorToDel;

            for(let i=0; i< parentElClasses.length; i++)
            {
                if(parentElClasses[i].startsWith('bg'))  currentColorToDel = parentElClasses[i];
            }

            let previousSiblingClasses =  parentEl.previousElementSibling.querySelector('.stuff').classList;

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
        },


        _buildSmallScreenTree()
        {
            if(window.innerWidth > 768) return;
            this._hideSideArrows();
            this._removeBigScreenClasses();
            this._setFirstColumnColor();
            this._showDownArrows()

        },

        _openSmScreenChildren(actualEl, childrenGroup, parentId)
        {
            let myItemsParentIdArr = this.$refs.tree.querySelectorAll('.origin');

            let myItemsParentId = false;

            myItemsParentIdArr.forEach( (item) => {
                if(item.dataset.parentId == parentId) {
                    myItemsParentId = item;} });

            if(!myItemsParentId) return;

            myItemsParentId.classList.remove('hidden');

            childrenGroup.classList.remove('hidden', 'top-0');
            childrenGroup.classList.add('left-0','right-0')

            this._paintSmallScreenChild(actualEl, childrenGroup);

            let offsetLevels = ['.parentIdItems','.childrenGroup', '#tree' ]

            let offsetTop = actualEl.offsetTop;

            for (let i = 0; i < offsetLevels.length; i++)
            {
              offsetTop+=  actualEl.closest(offsetLevels[i]).offsetTop;
            }
            let actualHeight = actualEl.offsetHeight;

            actualOffsetTop = offsetTop+actualHeight;
            childrenGroup.style.top = actualOffsetTop+"px";


        },

        _paintSmallScreenChild(actualEl, childrenGroup)
        {
            let parentEl = actualEl.closest('.childrenGroup');

            let parentElClasses = parentEl.querySelector('.stuff').classList;
            let currentColorToDel;

            for (let i = 0; i < parentElClasses.length; i++) {
                if (parentElClasses[i].startsWith('bg')) currentColorToDel = parentElClasses[i];
            }

            let previousColor;


            for (let i = 0; i < parentElClasses.length; i++) {
                if (parentElClasses[i].startsWith('bg')) previousColor = parentElClasses[i];
            }


                let arr = previousColor.split('-');
                let colorNumber = Number(arr[2]);

                if (colorNumber < 600) {
                    arr[2] = (colorNumber + 100);
                    previousColor = arr.join('-');
                } else {
                    previousColor = this.directionsColors[1]
                }




//console.log(previousColor)
            let stuff = childrenGroup.querySelectorAll('.stuff');
            stuff.forEach(item => {
                item.classList.remove(currentColorToDel)
                item.classList.add(previousColor);

            })

        },

        _removeBigScreenClasses()
        {
            let childrenGroups = this.$refs.tree.querySelectorAll('.childrenGroup');

//b esides the first child group

            for(let i = 1; i< childrenGroups.length; i++)
            {
                childrenGroups[i].classList.remove('top-0');
                childrenGroups[i].classList.add('left-0','right-0');
                childrenGroups[i].style.removeProperty('left');
                childrenGroups[i].style.removeProperty('padding-top');

                let classes = childrenGroups[i].classList;
                for(let i=0; i < classes.length; i++)
                {
                    if(classes[i].startsWith('bg')) childrenGroups[i].classList.remove(classes[i])
                }
            }
        }



    }
}
