const dataSource = require("../utils").dataSource;
const Skill = require("../entity/Skill");
const Grade = require("../entity/Grade");

module.exports = {
    create: async (req, res) => {
        try {
            await dataSource
                .getRepository(Skill)
                .save(req.body);
            res.send("Created skill");
        } catch (error) {
            console.log(error);
            res.send("error while creating skill");
        }
    },
    read: async (req, res) => {
        try {
            const data = await dataSource
                .getRepository(Skill)
                .find();
            res.send(data);
        } catch (error) {
            console.log(error);
            res.send("didn't find skill");
        }
    },
    delete: async (req, res) => {
        try {
            await dataSource
                .getRepository(Skill)
                .delete(req.body)
                res.send("deleted skill")
        } catch (error) {
            console.log(error);
            res.send("didn't delete skill");
        }
    },
    update: async (req, res) => {
       try {
        await dataSource
            .getRepository(Skill)
            .update({ id: req.body.id }, { name: req.body.name })
            res.send("updated skill");
       } catch(error) {
        console.log(error);
        res.send("didn't update skill")
       }
    },
    addGrade: async (req, res) => {
        try {
            const skillToUpdate = await dataSource
            .getRepository(Skill)
            .findOneBy({name: req.body.skillName});
            console.log(skillToUpdate);

            const gradeToAdd = await dataSource
            .getRepository(Grade)
            .findOneBy({name: req.body.skillValue});

            skillToUpdate.grades = [...skillToUpdate.grades, gradeToAdd];
            await dataSource.getRepository(Skill).save(skillToUpdate)
            res.send("Grade added to skill");

        }catch(error) {
                res.send("Error while updating grade");
            }
    }
};