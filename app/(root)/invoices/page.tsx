import { GetInvoices } from "@/app/actions/Invoice.actions"

const page = async() => {

    const Invoices = await GetInvoices(); 
    console.log(Invoices?.Invoices[0]);
    if(Invoices?.Invoices.length === undefined){
        return(
            <div>
                No Invoices Found
            </div>
        )
    }

  return (
    <div>
        {Invoices?.Invoices.map((invoice,index)=>{
            return(
                <div key={index}>
                    <div>
                        Invoice #{index + 1} - {invoice._id.toString()}
                    </div>
                </div>
            )
        })}
        
    </div>
  )
}

export default page