import { Component, Prop, Vue, Watch, Emit} from 'vue-property-decorator';
import './index.less';
interface Item {
  text: string;
  compelete: boolean;
}

@Component({
  name: 'TodoItem',
})
export default class TodoItem extends Vue {
  @Prop(Object) private item!: Item;
  @Prop(Number) private index!: number;
  @Prop(Number) private editIndex!: number;
  private editText: string = '';

  @Watch('editIndex')
  private editIndexChange(index: number) {
    if (index === this.index) {
      this.editText = this.item.text;
    } else {
      this.editText = '';
    }
  }


  // private save() {
  //   this.$emit('on-save', {
  //     index: this.index,
  //     content: this.editText,
  //   });
  // }
  // private edit(e: Event) {
  //   this.$emit('on-edit', this.index);
  // }
  // private cancel() {
  //   this.$emit('on-cancel');
  // }

  @Emit('on-save')
  private save(e: Event) {
    e.stopPropagation();
    return {
      index: this.index,
      content: this.editText,
    };
  }

  @Emit('on-edit')
  private edit(e: Event) {
    e.stopPropagation();
    return this.index;
  }

  @Emit('on-cancel')
  private cancel(mark: boolean, e: Event) {
    e.stopPropagation();
    return mark;
  }

  @Emit('on-complete')
  private compelete(e: Event) {
    e.stopPropagation();
    return this.index;
  }


  protected render() {
    console.log('item:', this.item); // tslint:disable-line
    console.log('index', this.index); // tslint:disable-line
    console.log('editIndex', this.editIndex); // tslint:disable-line

    return (
      <li class='item-warp' on-click={this.compelete}>
        {
          this.editIndex === this.index ? (<div>
            <a-input v-model={this.editText} style='width: 220px;'></a-input>
            {/* 使用自定义事件写法：nativeOn-click，如果提供了事件,使用 on-click  */}
            <a-icon type='check' nativeOn-click={this.save}></a-icon>
            <a-icon type='close' nativeOn-click={this.cancel.bind(this, false)}></a-icon>
          </div>) : (<div>
            <span style={this.item.compelete ? {textDecoration: 'line-through'} : {}}>{this.item.text}</span>
            <a-icon type='edit' nativeOn-click={this.edit}></a-icon>
          </div>)
        }
      </li>
    );
  }
}

