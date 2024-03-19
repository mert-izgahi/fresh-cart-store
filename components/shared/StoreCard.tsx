import { useGetStoreQuery } from "@/redux/stores/api";
import {
    Anchor,
    Button,
    Card,
    CardSection,
    Center,
    Image,
    Stack,
    Text,
} from "@mantine/core";
import React from "react";
interface Props {
    storeId: string;
}
function StoreCard({ storeId }: Props) {
    const { data: store, isLoading } = useGetStoreQuery({
        id: storeId,
    });
    return (
        <Card withBorder>
            <CardSection p={"md"}>
                <Stack>
                    <Center>
                        <Image
                            src={store?.logo}
                            height={100}
                            width={100}
                            radius={"md"}
                        />
                    </Center>
                    <Center>
                        <Anchor href={`/stores/${store?._id}`}>
                            {store?.name}
                        </Anchor>
                    </Center>
                </Stack>
            </CardSection>
            <CardSection p="md">
                <Text>{store?.description}</Text>
            </CardSection>
        </Card>
    );
}

export default StoreCard;
