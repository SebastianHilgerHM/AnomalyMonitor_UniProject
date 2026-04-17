import React from 'react';
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors, spacing } from '../../constants/theme';

export default function TabsLayout() {
    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarShowLabel: false,
                tabBarStyle: {
                    backgroundColor: colors.card,
                    borderTopColor: colors.card,
                    borderTopWidth: 1,
                    height: 74,
                    paddingTop: 8,
                    paddingBottom: 10,
                },
                tabBarActiveTintColor:colors.ctaaccent,
                tabBarInactiveTintColor:'#000000',
            }}
        >
            <Tabs.Screen
                name="home"
                options={{
                    title:'Home',
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="home" color={color} size={size} />
                    ),
                }}
            />
            <Tabs.Screen
                name="newanomaly"
                options={{
                    title:'New Anomaly',
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="add-circle" color={color} size={size} />
                    ),
                }}
            />
            <Tabs.Screen
                name="myanomalies"
                options={{
                    title:'My Anomalies',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="invoice-list" color={color} size={size} />
                    ),
                }}
            />
            <Tabs.Screen
                name="search"
                options={{
                    title:'Search',
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="search" color={color} size={size} />
                    ),
                }}
            />
        </Tabs>
    );
}