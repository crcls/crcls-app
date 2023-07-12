import { registerPanel, handleField } from "./CreateMember.module.scss"

const CreateMember = () => (
  <div class={registerPanel}>
    <div class={handleField}>
      <label for="handle">Choose your handle</label>
      <input type="text" name="handle" />
    </div>
  </div>
)

export default CreateMember
