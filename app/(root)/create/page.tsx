import { CreateForm } from "@/components/create/CreateForm"
import Nav from "@/components/shared/Nav"

const page = () => {
  return (
      <>
      <div>
        <Nav/>
      </div>

      <div className="px-2">
        <CreateForm/>
      </div>
      </>
  )
}

export default page