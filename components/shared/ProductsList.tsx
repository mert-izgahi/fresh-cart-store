"use client";
import { useGetProductsQuery } from "@/redux/products/api";
import { IProduct } from "@/server/models/Product.model";
import { Card, Grid, GridCol } from "@mantine/core";
import React from "react";
import ProductCard from "./ProductCard";

function ProductsList() {
    const { data: products, isLoading } = useGetProductsQuery({});
    return (
        <Grid columns={5}>
            {products &&
                products.map((product: IProduct) => (
                    <GridCol span={1} key={product._id}>
                        <ProductCard product={product} isLoading={isLoading} />
                    </GridCol>
                ))}
        </Grid>
    );
}

export default ProductsList;
