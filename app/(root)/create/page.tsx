import { GetImagesByType } from "@/app/actions/Image.action"
import PreviewSwitcher from "@/components/create/PreviewSwitcher"

const page = async() => {

  const Images = await GetImagesByType();
  

  return (
    <>
      <PreviewSwitcher Images={Images}/>
    </>
  )
}

export default page
