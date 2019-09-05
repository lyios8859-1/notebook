<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class FormValidataeMixin extends Vue {
  public from!: object;

  public handleSubmit(name: string): string {
    return name + '_ly';
  }

  public handleReset(): void {
    console.log('handleReset');
  }
}
</script>