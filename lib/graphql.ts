import { gql } from '@apollo/client';

// Query: Fetch Items
export const GET_ITEMS = gql`
    query GetItems {
        items {
            id
            name
            price
        }
    }
`;

// Mutation: Add Item
// export const ADD_ITEM = gql`
//     mutation AddItem($name: String!, $price: Int!) {
//         addItem(name: $name, price: $price) {
//             id
//             name
//             price
//         }
//     }
// `;
