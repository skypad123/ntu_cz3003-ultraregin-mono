import React from "react";

const SummaryReport = () => {
    return (
        <section>
            <div class="container">
                <div class="row">
                    <h3 class="mt-3">Summary Report</h3>
                </div>


                <div class="card border-0">
                    
                    <div class="world-btns">
                        <div class="input-group-btn">
                            <div class="btn-world">
                                <input type="radio" name="class" value="Overview" />Overview
                            </div>
                            <div class="btn-world">
                                <input type="radio" name="class" value="ClassA" />Class A
                            </div>
                            <div class="btn-world">
                                <input type="radio" name="class" value="ClassB" />Class B
                            </div>
                            <div class="btn-world">
                                <input type="radio" name="class" value="ClassC" />Class C
                            </div>
                        </div>
                    </div>

                    <div class="graph">
                        <Bar percent={1} />
                        <Bar percent={20} />
                    </div>
                </div>

            </div>
        </section>

        );
}

export default SummaryReport;