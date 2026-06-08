import {createApi, fakeBaseQuery} from '@reduxjs/toolkit/query/react';
import {addresses, categories, deliveryAgent, orders, products, promoCodes} from '@/mocks/data';
import type {Address, Category, DeliveryAgent, Order, Product, PromoCode} from '@/types/domain';

const wait = async () => new Promise(resolve => setTimeout(resolve, 300 + Math.floor(Math.random() * 501)));

type ApiError = {message: string};

const matchQuery = (product: Product, query: string) =>
  [product.name, product.brand, product.weight, ...product.tags].join(' ').toLowerCase().includes(query.toLowerCase());

export const blinkitApi = createApi({
  reducerPath: 'blinkitApi',
  baseQuery: fakeBaseQuery<ApiError>(),
  tagTypes: ['Products', 'Orders', 'Addresses'],
  endpoints: builder => ({
    getBootstrap: builder.query<{categories: Category[]; products: Product[]; promos: PromoCode[]}, void>({
      queryFn: async () => {
        await wait();
        return {data: {categories, products: products.slice(0, 30), promos: promoCodes}};
      },
      providesTags: ['Products'],
    }),
    getCategories: builder.query<Category[], void>({
      queryFn: async () => {
        await wait();
        return {data: categories};
      },
    }),
    getProducts: builder.query<Product[], {categoryId?: string; query?: string; sort?: 'relevance' | 'priceLow' | 'priceHigh'} | void>({
      queryFn: async args => {
        await wait();
        let result = products.filter(product => (args?.categoryId ? product.categoryId === args.categoryId : true));
        if (args?.query) result = result.filter(product => matchQuery(product, args.query ?? ''));
        if (args?.sort === 'priceLow') result = [...result].sort((a, b) => a.price - b.price);
        if (args?.sort === 'priceHigh') result = [...result].sort((a, b) => b.price - a.price);
        return {data: result};
      },
      providesTags: ['Products'],
    }),
    getProduct: builder.query<Product, string>({
      queryFn: async id => {
        await wait();
        const product = products.find(item => item.id === id);
        return product ? {data: product} : {error: {message: 'Product not found'}};
      },
    }),
    getAddresses: builder.query<Address[], void>({
      queryFn: async () => {
        await wait();
        return {data: addresses};
      },
      providesTags: ['Addresses'],
    }),
    getPromos: builder.query<PromoCode[], void>({
      queryFn: async () => {
        await wait();
        return {data: promoCodes};
      },
    }),
    getOrders: builder.query<Order[], void>({
      queryFn: async () => {
        await wait();
        return {data: orders};
      },
      providesTags: ['Orders'],
    }),
    getDeliveryAgent: builder.query<DeliveryAgent, void>({
      queryFn: async () => {
        await wait();
        return {data: deliveryAgent};
      },
    }),
  }),
});

export const {
  useGetBootstrapQuery,
  useGetCategoriesQuery,
  useGetProductsQuery,
  useGetProductQuery,
  useGetAddressesQuery,
  useGetPromosQuery,
  useGetOrdersQuery,
  useGetDeliveryAgentQuery,
} = blinkitApi;
