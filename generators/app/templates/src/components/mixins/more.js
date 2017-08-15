export default {
    data() {
        return {
            showMore: {},
            moreString: {
                infor: '收起',
                account: '收起'
            }
        }
    },
    methods: {
        lookMore(me) {
            this.$set(this.showMore, me, !this.showMore[me])
            this.showMore[me] ? this.moreString[me] = '更多' : this.moreString[me] = '收起';
        }
    },
}