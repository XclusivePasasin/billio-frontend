<template>
    <div class="flex h-screen bg-gray-100">
        <SideBar />
        <div class="flex-1 flex flex-col overflow-hidden">
            <header class="bg-white shadow-sm z-10">
                <div class="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
                    <h1 class="text-2xl font-semibold text-gray-900">Dashboard</h1>
                </div>
            </header>
            <main class="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
                <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                    <div class="px-4 py-6 sm:px-0">
                        <div class="border-4 border-dashed border-gray-200 rounded-lg h-96 p-4">
                            <h2 class="text-xl font-semibold mb-4">Welcome to Your Dashboard</h2>
                            <p class="mb-4">This is an example of how your content will appear alongside the SideBar.
                                Try resizing the window or toggling the SideBar to see how it responds.</p>
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div class="bg-white p-4 rounded-lg shadow">
                                    <h3 class="font-semibold mb-2">Recent Activity</h3>
                                    <ul class="list-disc list-inside">
                                        <li>Updated profile information</li>
                                        <li>Completed 2 tasks</li>
                                        <li>Scheduled a meeting</li>
                                    </ul>
                                </div>
                                <div class="bg-white p-4 rounded-lg shadow">
                                    <h3 class="font-semibold mb-2">Quick Stats</h3>
                                    <div class="flex justify-between">
                                        <span>Projects:</span>
                                        <span class="font-bold">12</span>
                                    </div>
                                    <div class="flex justify-between">
                                        <span>Tasks:</span>
                                        <span class="font-bold">25</span>
                                    </div>
                                    <div class="flex justify-between">
                                        <span>Completed:</span>
                                        <span class="font-bold">18</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    </div>
</template>
<script>
import SideBar from '../components/SideBar.vue'

export default {
    name: 'DashBoard',
    components: {
        SideBar
    }
}
</script>
<style scoped>

</style>