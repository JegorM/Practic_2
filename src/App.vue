<template>
  <div class="centro">
    <div class="heaser-serch-add">
      <input class="nameStudent oppa" v-model="student.name" />
      <input class="checkTusk" type="checkbox" v-model="student.isDonePr" />
      <select class="gruppa" v-model="student.group">
        <option value="RPZ 19 1/9">RPZ 19 1/9</option>
        <option value="RPZ 19 2/9">RPZ 19 2/9</option>
      </select>
      <button class="addStudent oppa" @click="addStudent()">Add student</button>
    </div>
    <input
      class="serachNameStudents oppa"
      placeholder="Search"
      type="text"
      name="search"
      v-model="search"
    /><br />
    <table class="allStudents">
      <tr v-for="item in students" :key="item._id">
        <td class="marg">{{ item.name }}</td>
        <td class="marg"><input type="checkbox" v-model="item.isDonePr" /></td>
        <td class="marg">{{ item.group }}</td>
        <td class="marg">
          <a href="#" @click="deleteStudent(item._id)">Видалити</a>
        </td>
        <template v-if="item._id == editId">
          <td><input v-model="item.name" /></td>
          <td class="marg">
            <input type="checkbox" v-model="item.isDonePr" />
          </td>
          <td class="marg">{{ item.group }}</td>
          <button @click="updateStudentInfo(editId)">Update student</button>
        </template>
        <template v-else>
          <td>
            <a href="#" @click.prevent="setEditItem(item._id)">Update</a>
          </td>
        </template>

        <!-- <td class="marg"><a href="#" @click="supdateStudent(item._id)">Змінити</a></td> -->
      </tr>
    </table>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  data() {
    return {
      editId: '',
      students: [],
      search: '',
      student: { name: '', isDonePr: false, group: '' },
    };
  },
  mounted: function () {
    axios.get('http://34.82.81.113:3000/students').then((response) => {
      console.log(response.data);
      this.students = response.data;
    });
  },

  methods: {
    deleteStudent(studId) {
      axios
        .delete(`http://34.82.81.113:3000/students/${studId}`, this.studId)
        .then(() => {
          axios.get('http://34.82.81.113:3000/students').then((response) => {
            console.log(response.data);
            this.students = response.data;
          });
        });
    },

    addStudent() {
      axios.post('http://34.82.81.113:3000/students', this.student).then(() => {
        axios.get('http://34.82.81.113:3000/students').then((response) => {
          console.log(response.data);
          this.students = response.data;
        });
      });
    },

    supdateStudent() {
      console.log('a');
    },

    fillformer: function (id) {
      let foundStudent = this.students.find((element) => {
        return element.id == id;
      });
      (this.id = foundStudent._id), (this.name = foundStudent.name);
    },

    setEditItem(id) {
      this.editId = id;
    },

    updateStudentInfo(id) {
      let foundStudent = this.students.find((element) => {
        return element._id == id;
      });

      axios
        .put('http://34.82.81.113:3000/students/' + id, {
          name: foundStudent.name,
          group: foundStudent.group,
          isDonePr: false,
        })
        .then((response) => {
          console.log(response.data);
        });

      this.editId = 0;
    },
  },
};
</script>

<style src="./style/style.css"></style>
