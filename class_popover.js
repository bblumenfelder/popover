export default class Popover {
    /**
     *
     * @param PopoverElement
     * @param ReferenceElement
     */
    constructor (PopoverElement, ReferenceElement) {
        this.PopoverElement = PopoverElement;
        this.ReferenceElement = ReferenceElement;
    }


    /**
     *
     * @returns {Promise<void>}
     */
    async reset () {
        this.PopoverElement.style.left = '0px';
        this.PopoverElement.style.top = '0px';
        this.PopoverElement.classList.remove('fadeInUp');
        this.PopoverElement.classList.remove('fadeInDown');
    }


    async getMeasures () {

    }


    /**
     *
     * @returns {Promise<void>}
     */
    async calc () {
        this.PopoverElement_Width = this.PopoverElement.getBoundingClientRect().width;
        this.PopoverElement_Height = this.PopoverElement.getBoundingClientRect().height;
        this.ReferenceElement_SpaceRight_NoScroll = document.documentElement.clientWidth - this.ReferenceElement.getBoundingClientRect().right + this.ReferenceElement.getBoundingClientRect().width;
        this.ReferenceElement_SpaceBottom_NoScroll = document.documentElement.clientHeight - this.ReferenceElement.getBoundingClientRect().bottom;

        this.ReferenceElement_SpaceRight_WithScroll = window.innerWidth - this.ReferenceElement.getBoundingClientRect().right + this.ReferenceElement.getBoundingClientRect().width;
        this.ReferenceElement_SpaceLeft = this.ReferenceElement.getBoundingClientRect().left + this.ReferenceElement.getBoundingClientRect().width;
        this.CenterOffset = (this.PopoverElement_Width - this.ReferenceElement.getBoundingClientRect().width) / 2;
        this.PopoverElement_Under_Margin_Top = this.ReferenceElement.getBoundingClientRect().bottom - (this.PopoverElement.getBoundingClientRect().top + document.body.scrollTop);
        this.PopoverElement_Over_Margin_Top = this.ReferenceElement.getBoundingClientRect().top - this.PopoverElement_Height;
        this.PopoverElement_Left_Flush = this.ReferenceElement.getBoundingClientRect().left - (this.PopoverElement.getBoundingClientRect().left + document.body.scrollLeft);
        this.ReferenceElement_Margin_Right = this.ReferenceElement_SpaceRight_WithScroll - this.ReferenceElement.getBoundingClientRect().width;
        this.PopoverElement_Right_Flush = window.innerWidth - (this.ReferenceElement_Margin_Right + this.PopoverElement_Width);
    }


    /**
     *
     * @returns {Promise<void>}
     */
    async getPosX () {
        if (this.ReferenceElement_SpaceRight_NoScroll > this.PopoverElement_Width) {
            this.PosX = 'Left';
        }
        else if (this.ReferenceElement_SpaceLeft > this.PopoverElement_Width) {
            this.PosX = 'Right';
        }
        else {
            this.PosX = 'Left';
        }
    }


    async getPosY () {
        if (this.ReferenceElement_SpaceBottom_NoScroll > this.PopoverElement_Height) {
            this.PosY = 'Bottom'
        }

    }


    /**
     *
     * @returns {Promise<void>}
     */
    async show () {
        await this.reset();
        await this.calc();
        await this.getPosX();
        await this.getPosY();
        await this.applyCSS();

    }


    /**
     *
     * @returns {Promise<void>}
     */
    async applyCSS () {

        if (this.PosX === 'Left') {
            this.PopoverElement.style.left = this.PopoverElement_Left_Flush + 'px';
        }
        else {
            this.PopoverElement.style.left = this.PopoverElement_Right_Flush + 'px';
        }

        if (this.PosY === 'Bottom') {
            this.PopoverElement.classList.add('fadeInUp');
            this.PopoverElement.style.top = this.PopoverElement_Under_Margin_Top + 'px';
        }
        else {
            this.PopoverElement.classList.add('fadeInDown');
            this.PopoverElement.style.top = this.PopoverElement_Over_Margin_Top + 'px';
        }
    }



    async trash () {
        this.PopoverElement_Over_Top = (this.ReferenceElement.getBoundingClientRect().top - this.PopoverElement.getBoundingClientRect().height) - (this.PopoverElement.getBoundingClientRect().top + document.body.scrollTop);
        this.PopoverElement_Over_Left = (this.ReferenceElement.getBoundingClientRect().left - this.CenterOffset) - (this.PopoverElement.getBoundingClientRect().left + document.body.scrollLeft);

    }
}