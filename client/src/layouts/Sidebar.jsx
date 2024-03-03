import React from "react";
import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Chip,
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import {
  PresentationChartBarIcon,
  ShoppingBagIcon,
  HomeModernIcon,
  UserGroupIcon,
  UserCircleIcon,
  Cog6ToothIcon,
  InboxIcon,
  PowerIcon,
} from "@heroicons/react/24/solid";
import { ChevronRightIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import {selectRole} from '../features/authentication/services/loginSlice'

 
export function Sidebar() {
  const [open, setOpen] = React.useState(0);
  const role=useSelector(selectRole)

  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };
 
  return (
    <Card className="h-[calc(100vh-2rem)] fixed w-fit max-w-[20rem] p-4 rounded-none z-10">
      <List>

      <Accordion
          open={open === 3}
          icon={
            <ChevronDownIcon
              strokeWidth={2.5}
              className={`mx-auto h-4 w-4 transition-transform ${open === 3 ? "rotate-180" : ""}`}
            />
          }
        >
          <ListItem className="p-0" >
            <AccordionHeader onClick={() => console.log()} className="border-b-0 p-3">
              <ListItemPrefix>
                <HomeModernIcon className="h-5 w-5" />
              </ListItemPrefix>
              <Typography color="blue-gray" className="mr-auto font-normal">
             <Link to={role==='owner'?'/owner/home':'/admin/home'}> { 'Dashboard'}</Link> 
              </Typography>
            </AccordionHeader>
          </ListItem>

          {/* <AccordionBody className="py-1">
            <List className="p-0">
              <ListItem>
                <ListItemPrefix>
                  <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                </ListItemPrefix>
                <Link to={role==='owner'?'/owner/home':role==='admin'?'/admin/home':null}>{role==='owner'?'Register Hotel':role==='admin'?'users list':null}</Link>
              </ListItem>

              {

              
            role==='owner'?(<ListItem>
                <ListItemPrefix>
                  <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                </ListItemPrefix>
                <Link to={'/owner/hotel-list'}>Hotel List</Link>  
              </ListItem>):null
              }

            </List>
          </AccordionBody> */}
        </Accordion>
        <Accordion
          open={open === 3}
          icon={
            <ChevronDownIcon
              strokeWidth={2.5}
              className={`mx-auto h-4 w-4 transition-transform ${open === 3 ? "rotate-180" : ""}`}
            />
          }
        >
          <ListItem className="p-0" selected={open === 3}>
            <AccordionHeader onClick={() => handleOpen(3)} className="border-b-0 p-3">
              <ListItemPrefix>
                <HomeModernIcon className="h-5 w-5" />
              </ListItemPrefix>
              <Typography color="blue-gray" className="mr-auto font-normal">
               { role==='owner'?'Hotels':role==='admin'?'Users':null}
              </Typography>
            </AccordionHeader>
          </ListItem>
          <AccordionBody className="py-1">
            <List className="p-0">
              <ListItem>
                <ListItemPrefix>
                  <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                </ListItemPrefix>
                <Link to={role==='owner'?'/owner/register-hotel':role==='admin'?'/admin/home':null}>{role==='owner'?'Register Hotel':role==='admin'?'users list':null}</Link>
              </ListItem>

              {

              
            role==='owner'?(<ListItem>
                <ListItemPrefix>
                  <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                </ListItemPrefix>
                <Link to={'/owner/hotel-list'}>Hotel List</Link>  
              </ListItem>):null
              }

            </List>
          </AccordionBody>
        </Accordion>

      {role==='owner'?  <Accordion
          open={open === 5}
          icon={
            <ChevronDownIcon
              strokeWidth={2.5}
              className={`mx-auto h-4 w-4 transition-transform ${open === 3 ? "rotate-180" : ""}`}
            />
          }
        >
          <ListItem className="p-0" selected={open === 5}>
            <AccordionHeader onClick={() => handleOpen(5)} className="border-b-0 p-3">
              <ListItemPrefix>
                <UserGroupIcon className="h-5 w-5" />
              </ListItemPrefix>
              <Typography color="blue-gray" className="mr-auto font-normal">
               { 'Users'}
              </Typography>
            </AccordionHeader>
          </ListItem>
          <AccordionBody className="py-1">
            <List className="p-0">
              <ListItem>
                <ListItemPrefix>
                  <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                </ListItemPrefix>
                <Link to={'/owner/chats'}>chats</Link>
              </ListItem>
            </List>
          </AccordionBody>
        </Accordion>:null}

      {role==='owner'?  <Accordion
          open={open === 6}
          icon={
            <ChevronDownIcon
              strokeWidth={2.5}
              className={`mx-auto h-4 w-4 transition-transform ${open === 3 ? "rotate-180" : ""}`}
            />
          }
        >
          <ListItem className="p-0" selected={open === 6}>
            <AccordionHeader onClick={() => handleOpen(6)} className="border-b-0 p-3">
              <ListItemPrefix>
                <UserGroupIcon className="h-5 w-5" />
              </ListItemPrefix>
              <Typography color="blue-gray" className="mr-auto font-normal">
               { 'Bookings'}
              </Typography>
            </AccordionHeader>
          </ListItem>
          <AccordionBody className="py-1">
            <List className="p-0">
              <ListItem>
                <ListItemPrefix>
                  <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                </ListItemPrefix>
                <Link to={'/owner/all-bookings'}>All bookings</Link>
              </ListItem>
            </List>
          </AccordionBody>
        </Accordion>:null}

        {role==='owner'?  <Accordion
          open={open === 7}
          icon={
            <ChevronDownIcon
              strokeWidth={2.5}
              className={`mx-auto h-4 w-4 transition-transform ${open === 7 ? "rotate-180" : ""}`}
            />
          }
        >
          <ListItem className="p-0" selected={open === 7}>
            <AccordionHeader onClick={() => handleOpen(7)} className="border-b-0 p-3">
              <ListItemPrefix>
                <UserGroupIcon className="h-5 w-5" />
              </ListItemPrefix>
              <Typography color="blue-gray" className="mr-auto font-normal">
               { 'Offers & Coupons'}
              </Typography>
            </AccordionHeader>
          </ListItem>
          <AccordionBody className="py-1">
            <List className="p-0">
            <ListItem>
                <ListItemPrefix>
                  <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                </ListItemPrefix>
                <Link to={'/owner/all-coupons'}>All Coupons</Link>
              </ListItem>
              <ListItem>
                <ListItemPrefix>
                  <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                </ListItemPrefix>
                <Link to={'/owner/add-coupon'}> Add Coupon</Link>
              </ListItem>
              <ListItem>
                <ListItemPrefix>
                  <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                </ListItemPrefix>
                <Link to={'/owner/edit-coupon'}> Edit Coupon</Link>
              </ListItem>
            </List>
          </AccordionBody>
        </Accordion>:null}

        {role==='owner'?  <Accordion
          open={open === 8}
          icon={
            <ChevronDownIcon
              strokeWidth={2.5}
              className={`mx-auto h-4 w-4 transition-transform ${open === 8 ? "rotate-180" : ""}`}
            />
          }
        >
          <ListItem className="p-0" selected={open === 8}>
            <AccordionHeader onClick={() => handleOpen(8)} className="border-b-0 p-3">
              <ListItemPrefix>
                <UserGroupIcon className="h-5 w-5" />
              </ListItemPrefix>
              <Typography color="blue-gray" className="mr-auto font-normal">
               { 'Sales'}
              </Typography>
            </AccordionHeader>
          </ListItem>
          <AccordionBody className="py-1">
            <List className="p-0">
            <ListItem>
                <ListItemPrefix>
                  <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                </ListItemPrefix>
                <Link to={'/owner/sales-report-hotels'}>sales report by hotels</Link>
              </ListItem>

            </List>
          </AccordionBody>
        </Accordion>:null}





        <Accordion
          open={open === 4}
          icon={
            <ChevronDownIcon
              strokeWidth={2.5}
              className={`mx-auto h-4 w-4 transition-transform ${open === 4 ? "rotate-180" : ""}`}
            />
          }
        >
        {role==='admin'? <ListItem className="p-0" selected={open === 4}>
            <AccordionHeader onClick={() => handleOpen(4)} className="border-b-0 p-3">
              <ListItemPrefix>
                <ShoppingBagIcon className="h-5 w-5" />
              </ListItemPrefix>
              <Typography color="blue-gray" className="mr-auto font-normal">
               { role==='admin'?'Hotels':null}
              </Typography>
            </AccordionHeader>
          </ListItem>:null}

          <AccordionBody className="py-1">
            <List className="p-0">
              <ListItem>
                <ListItemPrefix>
                  <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                </ListItemPrefix>
                <Link to={role==='owner'?'/owner/register-hotel':role==='admin'?'/admin/hotel-list':null}>{role==='owner'?'Register Hotel':role==='admin'?'Hotel List':null}</Link>
              </ListItem>

              {

              
            role==='owner'?(<ListItem>
                <ListItemPrefix>
                  <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                </ListItemPrefix>
                <Link to={'/owner/hotel-list'}>Hotel List</Link>  
              </ListItem>):null
              }

            </List>
          </AccordionBody>
        </Accordion>




{role==='admin'?  <Accordion
          open={open === 6}
          icon={
            <ChevronDownIcon
              strokeWidth={2.5}
              className={`mx-auto h-4 w-4 transition-transform ${open === 3 ? "rotate-180" : ""}`}
            />
          }
        >
          <ListItem className="p-0" selected={open === 6}>
            <AccordionHeader onClick={() => handleOpen(6)} className="border-b-0 p-3">
              <ListItemPrefix>
                <UserGroupIcon className="h-5 w-5" />
              </ListItemPrefix>
              <Typography color="blue-gray" className="mr-auto font-normal">
               { 'Sales'}
              </Typography>
            </AccordionHeader>
          </ListItem>
          <AccordionBody className="py-1">
            <List className="p-0">
              <ListItem>
                <ListItemPrefix>
                  <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                </ListItemPrefix>
                <Link to={'/admin/sales-report'}>sales report</Link>
              </ListItem>
            </List>
          </AccordionBody>
        </Accordion>:null}
      </List>
    </Card>
  );
}