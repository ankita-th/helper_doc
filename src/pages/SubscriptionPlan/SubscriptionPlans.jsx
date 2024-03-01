import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  FormControl,
  Grid,
  InputLabel,
  FormLabel,
  MenuItem,
  Select,
  Typography,
  List,
  ListItem,
  Tabs,
  Tab,
} from "@mui/material";
import { Link } from "react-router-dom";
import SideMenuBar from "../../Components/Common/SideMenubar/SideMenuBar";
import { useTranslation } from "react-i18next";
import PillsTabs from "../../Components/Common/PillsTabs";
import { TABS } from "../../Components/SubscriptionPlanSection/Constant";

export default function SubscriptionPlans() {
    const { t } = useTranslation();
    const [selectedTab, setSelectedTab] = useState(0);

    const handleChange = (event, newValue) => {
        setSelectedTab(newValue);
    };

    const plans = [
        {
          title: "Starter",
          price: "$0/month",
          features: [
            
          ],
          buttonText: "Get Started",
        },
        {
          title: "Pro",
          price: "$20/month",
          features: [
          ],
          buttonText: "Get Started",
        },
        {
          title: "Business+",
          price: "$100/month",
          features: [
          ],
          buttonText: "Get Started",
        },
      ];

      const formatPrice = (price) => {
        const numericPrice = parseFloat(price.replace(/[^0-9.]/g, ""));
        const totalPrice = Math.floor(numericPrice);
        const cents = (numericPrice - totalPrice).toFixed(2).substring(1);
        return (
          <div className="pricingPrice">
            <sup>US$</sup>
            {totalPrice}
            <sub>
              {cents} <span>/ month</span>
            </sub>
          </div>
        );
      };
  return (
    <>
      <Grid container className="dashboardRow">
        {/* Sidebar Component */}
        <Grid className="dashboardSidebar">
          <SideMenuBar />
        </Grid>
        {/* Main Content */}
        <Grid className="dashboardContentArea">
            <Box maxWidth="xl" sx={{ padding: "20px" }}>
              <Typography variant="h2" className="commonTitle">
                    <Button className="customBack"><img src="./longArrow.svg" alt="Long Arrow"/></Button>Subscription Plans
              </Typography>
              <Typography variant="body1" ml={8}>
                We offer great price plan for the application
              </Typography>

              <Grid>
              <PillsTabs
                    selectedTab={selectedTab}
                    handleChange={handleChange}
                    tabs={TABS}
                />
                <Grid container spacing={3}>
                    {plans.map((plan, index) => (
                        <Grid key={index} item xs={12} md={4}>
                            <div><Typography className="planRecommended">Recommended</Typography></div>
                            <div className={`plan-col plan-${index}`}>
                                <Typography className="title" variant="h2">
                                {plan.title}
                                </Typography>
                                <p>
                                facilisis arcu quis sapien ven enatis, a feugiat urna tristique. Sed gravida non mauris
                                </p>
                                {formatPrice(plan.price)}
                                <ul className="plan-features">
                                {plan.features.map((feature, featureIndex) => (
                                    <li key={featureIndex}>{feature}</li>
                                ))}
                                </ul>
                                <Button className="simpleButton">{t("purchase_now")}</Button>
                            </div>
                        </Grid>
                    ))}
                    </Grid>
              </Grid>
            </Box>
        </Grid>

        <Grid className="dashboardContentArea footerDash employerFooter">
          <Box className="copyrightArea">
            <Typography>©2024 HelperDoc. All Rights Reserved.</Typography>
          </Box>
          <Box className="footerLinks">
            <List>
              <ListItem>
                <Link to="/">Contact Us</Link>
              </ListItem>
              <ListItem>
                <Link to="/">FAQ’s</Link>
              </ListItem>
              <ListItem>
                <Link to="/">Privacy Policy</Link>
              </ListItem>
            </List>
          </Box>
        </Grid>
      </Grid>
    </>
  )
}
