import AdminLayout from "@/components/AdminLayout";
import {

  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Card,
  Grid,
  CardContent,
  Stack,
  Autocomplete

} from "@mui/material";
import dynamic from "next/dynamic";
import { Inter } from "next/font/google";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const inter = Inter({ subsets: ["latin"] });


export default function Dashboard() {


  const [data, setData] = useState([
    { number: 6, bgColor: "primary.main", field: "Total Leads" },
    { number: 16, bgColor: "secondary.main", field: "Follow-ups" },
    { number: 18, bgColor: "error.main", field: "Not Connected" },
    { number: 21, bgColor: "warning.main", field: "Enrolled" },
  ])

  return (
    <AdminLayout>
      <div className="h-screen">
   
     
        
      
      <div className="py-2">
      {/* <DashboardFilter/> */}
        <h3 className="text-2xl mb-5">Application Statistics</h3>

          
          <Grid container spacing={2}>


            {data.map(e => {
              return (
                <Grid item xs={12} sm={6} lg={3} md={4}>
                  
                  <Card sx={{ bgcolor: e.bgColor, color: "white" }}>
                    <CardContent>
                      <h2 className=" text-5xl">{e.number}</h2>
                      <p className="text-xl mt-2">{e.field}</p>
                    </CardContent>
                  </Card>
                </Grid>
              )
            })}
          </Grid>
 
      </div>

    </div>
    </AdminLayout>
  );
}