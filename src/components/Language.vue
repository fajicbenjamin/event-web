<template>
    <v-menu offset-y>
        <template #activator="{ on }">
            <v-btn icon v-on="on">
                <v-icon>language</v-icon>
            </v-btn>
        </template>
        <v-list>
            <v-list-tile
                    v-for="(item, index) in languages"
                    :key="index"
                    @click="changeLanguage(item.value)"
            >
                <v-list-tile-title>{{ item.name }}</v-list-tile-title>
                <v-icon v-if="item.value === $i18n.locale">check</v-icon>
            </v-list-tile>
        </v-list>
    </v-menu>
</template>

<script>
    export default {
        data: () => ({
            languages: [
                { name: 'English', value: 'en' },
                { name: 'Bosanski', value: 'bs' }
            ]
        }),
        methods: {
            changeLanguage(language) {
                this.$i18n.locale = language
            }
        }
    }
</script>

<style scoped>

</style>
