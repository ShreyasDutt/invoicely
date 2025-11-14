import { GetImagesByType } from "@/app/actions/Image.action"
import PreviewSwitcher from "@/components/create/PreviewSwitcher"
import Nav from "@/components/shared/Nav"

const page = async() => {

  const Images = await GetImagesByType();
  

  return (
    <>
      <div>
        <Nav />
      </div>
      <PreviewSwitcher Images={Images}/>
    </>
  )
}

export default page
