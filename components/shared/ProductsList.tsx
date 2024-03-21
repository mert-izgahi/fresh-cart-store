"use client";
import { useGetProductsQuery } from "@/redux/products/api";
import { IProduct } from "@/server/models/Product.model";
import { Card, Grid, GridCol, Stack } from "@mantine/core";
import React, { useMemo } from "react";
import ProductCard from "./ProductCard";
import { useSearchParams } from "next/navigation";
import Pagination from "./Pagination";

function ProductsList() {
    const searchParams = useSearchParams();
    const { data, isLoading } = useGetProductsQuery({
        params: searchParams.toString(),
    });

    const products = useMemo(() => data?.records, [data]);
    const totalPages = useMemo(() => data?.totalPages, [data]);

    return (
        <Stack>
            <Grid columns={5}>
                {products &&
                    products.map((product: IProduct) => (
                        <GridCol span={1} key={product._id}>
                            <ProductCard
                                product={product}
                                isLoading={isLoading}
                            />
                        </GridCol>
                    ))}
            </Grid>
            <Pagination total={totalPages} />
        </Stack>
    );
}

export default ProductsList;
